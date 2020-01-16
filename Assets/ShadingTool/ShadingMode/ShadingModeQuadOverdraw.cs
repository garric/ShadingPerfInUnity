namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using System.Collections.Generic;

    /// <summary>
    /// In order to make shading more correctly, we should launch a pre-depth pass to write opaque depth first!
    /// 
    /// ref:
    /// Quad Overdraw
    /// https://blog.selfshadow.com/2012/11/12/counting-quads/#meat
    /// UE QuadComplexityAccumulatePixelShader.usf
    /// 
    /// VPOS Screen Position
    /// https://docs.unity3d.com/Manual/SL-ShaderSemantics.html
    /// </summary>
    internal class ShadingModeQuadOverdraw : IShadingMode 
    {
        private List<ShadingViewQuadOverdraw> shadingViews = new List<ShadingViewQuadOverdraw>();
        private List<ShadingRendererQuadOverdraw> shadingRenderers = new List<ShadingRendererQuadOverdraw>();

        public void Enter(List<Camera> cameras)
        {
            foreach (ShadingViewQuadOverdraw shadingView in shadingViews)
                shadingView.Exit();
            shadingViews.Clear();

            foreach (Camera camera in cameras)
            {
                ShadingViewQuadOverdraw shadingView = camera.gameObject.GetComponent<ShadingViewQuadOverdraw>();
                if (shadingView == null)
                    shadingView = camera.gameObject.AddComponent<ShadingViewQuadOverdraw>();
                shadingViews.Add(shadingView);

                shadingView.hideFlags = HideFlags.DontSave | HideFlags.HideInInspector | HideFlags.HideInInspector;
                shadingView.quadOverdraw = this;
                shadingView.Enter(camera);
            }

            // collect all materials of sceneView
            // although this is not a good method, but we can't directly replace renderer's shader with uniforms
            // no UI and CommandBuffer now

            List<Renderer> allRenderers = Utility.FindObjectsOfAll<Renderer>();
            shadingRenderers = new List<ShadingRendererQuadOverdraw>(allRenderers.Count);
            foreach (Renderer renderer in allRenderers)
                shadingRenderers.Add(new ShadingRendererQuadOverdraw(renderer));

            //ShadingQuadOverdraw
            foreach (ShadingRenderer renderer in shadingRenderers)
                renderer.Shading();
        }

        public void OnViewWillPreCull(RenderTexture overdrawBuffer)
        {
            foreach (ShadingRendererQuadOverdraw renderer in shadingRenderers)
                renderer.SetOverdrawBuffer(overdrawBuffer);
        }

        public void Exit()
        {
            foreach (ShadingRenderer renderer in shadingRenderers)
                renderer.Reset();

            foreach (ShadingViewQuadOverdraw shadingView in shadingViews)
                shadingView.Exit();
            shadingViews.Clear();
        }

        public void Refresh()
        {
            foreach (ShadingRenderer renderer in shadingRenderers)
                renderer.Refresh();

            foreach (ShadingViewQuadOverdraw shadingView in shadingViews)
                shadingView.Refresh();
        }
    }
#endif
}
