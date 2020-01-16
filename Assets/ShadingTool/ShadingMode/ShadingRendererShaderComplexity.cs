namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;

    internal class ShadingRendererShaderComplexity : ShadingRenderer
    {
        protected override Shader GetShader(Material material)
        {
            if (Preferences.simulateDepthPrePass)
            {
                if (material && material.renderQueue < 2900) // simulating opaque rendering
                    return ShadingTool.resources.shaders.shaderComplexityDepth;
                else
                    return ShadingTool.resources.shaders.shaderComplexity;
            }
            else
                return ShadingTool.resources.shaders.shaderComplexity;
        }

        public ShadingRendererShaderComplexity(Renderer source) : base(source)
        {
            
        }

        public override void Refresh()
        {
            // copied from ue4
            float normalizeMul = 1.0f / Preferences.GetMaxShaderComplexityCount();
            for (int i = 0, imax = sharedMaterials.Length; i < imax; i++)
            {
                Material material = sharedMaterials[i];
                if (material == null)
                    continue;

                ShaderComplexityVariant complexity = ShadingTool.compiler.GetComplexity(material);
                renderer.sharedMaterials[i].SetVector("_NormalizedComplexity", new Vector4(complexity.vertex.instructions * normalizeMul, complexity.fragment.instructions * normalizeMul, 1 / 32.0f));
            }
        }
    }
#endif
}