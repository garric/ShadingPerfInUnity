namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;

    internal class ShadingRendererQuadOverdraw : ShadingRenderer
    {
        protected override Shader GetShader(Material material)
        {
            if (Preferences.simulateDepthPrePass)
            {
                if (material && material.renderQueue < 2900) // simulating opaque rendering
                    return ShadingTool.resources.shaders.quadOverdrawAccumulateDepth; 
                else
                    return ShadingTool.resources.shaders.quadOverdrawAccumulate;
            }                
            else
                return ShadingTool.resources.shaders.quadOverdrawAccumulate;
        }

        private RenderTexture overdrawBuffer;

        public ShadingRendererQuadOverdraw(Renderer source) : base(source)
        {
        }

        public void SetOverdrawBuffer(RenderTexture source)
        {
            overdrawBuffer = source;
        }

        public override void Refresh()
        {
            if (!overdrawBuffer)
                return;

            // copied from ue4
            float normalizeMul = 1.0f / Preferences.GetMaxShaderComplexityCount();
            for (int i = 0, imax = sharedMaterials.Length; i < imax; i++)
            {
                Material material = sharedMaterials[i];
                if (material == null)
                    continue;

                renderer.sharedMaterials[i].SetVector("_NormalizedComplexity", new Vector4(1.0f / 16, 1.0f / 16, 1.0f / 16, 1 / 32.0f));

                material.SetTexture("RWQuadBuffer", overdrawBuffer);
            }
        }
    }
#endif
}