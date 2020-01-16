namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using System.Collections.Generic;
    using UnityEditor;

    public class ShadingViewShaderComplexity : MonoBehaviour 
    {
        public void Enter(Camera camera)
        {
        }

        public void Exit(bool destroy = true)
        {
            if (destroy)
                Utility.Destroy(this);
        }

        public void Refresh()
        {
        }

        private void OnDisable()
        {
            Exit(false);
        }

        private void OnDestroy()
        {
            Exit(false);
        }
    }

#endif
}