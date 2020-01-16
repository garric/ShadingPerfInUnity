namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using System;

    [CreateAssetMenu(fileName = "ShadingToolResources", menuName = "ScriptableObjects/Shading Tool Resources", order = 1)]
    public sealed class Resources : ScriptableObject 
    {
        [System.Serializable]
        public sealed class Shaders 
        {
            public Shader shaderComplexity;
            public Shader shaderComplexityDepth;
            public Shader quadOverdrawAccumulate;
            public Shader quadOverdrawAccumulateDepth;
            public Shader quadOverdrawApply;
            public Shader quadOverdrawClear;
        }

        public Shaders Clone()
        {
            return (Shaders)MemberwiseClone();
        }

        public Shaders shaders;
    }
#endif
}
