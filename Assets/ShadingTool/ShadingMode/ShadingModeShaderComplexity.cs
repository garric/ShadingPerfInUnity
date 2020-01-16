namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using UnityEditor;
    using System.Collections.Generic;

    /// <summary>
    /// In order to make shading more correctly, we should launch a pre-depth pass to write opaque depth first!
    /// 
    /// ref:
    /// UE ShaderComplexityApplyPixelShader.usf
    /// https://forum.unity.com/threads/how-to-count-show-shader-cycles-or-operations-for-shader-profileing.618214/
    /// https://developer.arm.com/docs/101863/0700/using-mali-offline-compiler/performance-analysis/performance-table
    /// </summary>
    internal class ShadingModeShaderComplexity : IShadingMode 
    {
        private List<ShadingViewShaderComplexity> shadingViews = new List<ShadingViewShaderComplexity>();
        private List<ShadingRendererShaderComplexity> shadingRenderers = new List<ShadingRendererShaderComplexity>();

        public void Enter(List<Camera> cameras)
        {
            foreach (ShadingViewShaderComplexity shadingView in shadingViews)
                shadingView.Exit();
            shadingViews.Clear();

            foreach (Camera camera in cameras)
            {
                ShadingViewShaderComplexity shadingView = camera.gameObject.GetComponent<ShadingViewShaderComplexity>();
                if (shadingView == null)
                    shadingView = camera.gameObject.AddComponent<ShadingViewShaderComplexity>();
                shadingViews.Add(shadingView);

                shadingView.hideFlags = HideFlags.DontSave | HideFlags.HideInInspector | HideFlags.HideInInspector;
                shadingView.Enter(camera);
            }

            // collect all materials of sceneView
            // although this is not a good method, but we can't directly replace renderer's shader with uniforms
            // no UI and CommandBuffer now

            List<Renderer> allRenderers = Utility.FindObjectsOfAll<Renderer>();
            shadingRenderers = new List<ShadingRendererShaderComplexity>(allRenderers.Count);
            foreach (Renderer renderer in allRenderers)
                shadingRenderers.Add(new ShadingRendererShaderComplexity(renderer));

            if (CollectShaderComplexity())
                ShadingShaderComplexity();
        }

        private bool CollectShaderComplexity()
        {
            if (!ShadingTool.compiler.IsExist())
                return false;

            int totalMaterials = 0;
            foreach (ShadingRenderer renderer in shadingRenderers)
                totalMaterials += renderer.sharedMaterials.Length;

            int count = 0;
            foreach (ShadingRenderer renderer in shadingRenderers)
            {
                foreach (Material material in renderer.sharedMaterials)
                {
                    count++;
                    if (material == null || material.shader == null)
                        continue;

                    if (EditorUtility.DisplayCancelableProgressBar("Compile Shader", $"{material.shader.name} [{totalMaterials}/{count - 1}]", count / (float)totalMaterials))
                        return false;

                    if (!ShadingTool.compiler.CompileMaterial(material))
                        return false;
                }
            }

            EditorUtility.ClearProgressBar();
            return true;
        }

        private void ShadingShaderComplexity()
        {
            foreach (ShadingRenderer renderer in shadingRenderers)
                renderer.Shading();
        }

        public void Exit()
        {
            foreach (ShadingRenderer renderer in shadingRenderers)
                renderer.Reset();

            foreach (ShadingViewShaderComplexity shadingView in shadingViews)
                shadingView.Exit();
            shadingViews.Clear();
        }

        public void Refresh()
        {
            foreach (ShadingRenderer renderer in shadingRenderers)
                renderer.Refresh();

            foreach (ShadingViewShaderComplexity shadingView in shadingViews)
                shadingView.Refresh();
        }
    }
#endif
}
