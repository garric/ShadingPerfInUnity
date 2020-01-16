namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;

    internal class ShadingRenderer
    {
        protected Renderer renderer;
        public Material[] sharedMaterials;

        private bool m_reset = true;

        protected virtual Shader GetShader(Material material)
        {
            return null;
        }

        public ShadingRenderer(Renderer source)
        {
            renderer = source;
            sharedMaterials = renderer.sharedMaterials;
        }

        public virtual void Shading()
        {
            m_reset = false;

            Material[] materials = new Material[renderer.sharedMaterials.Length];
            for (int i = 0, imax = renderer.sharedMaterials.Length; i < imax; i++)
                materials[i] = new Material(GetShader(renderer.sharedMaterials[i]));
            renderer.sharedMaterials = materials;

            Refresh();
        }

        public virtual void Refresh()
        {
        }

        public void Reset()
        {
            m_reset = true;
            if (renderer)
                renderer.sharedMaterials = sharedMaterials;
        }

        [ContextMenu("Switch")]
        void Switch()
        {
            if (m_reset)
                Shading();
            else
                Reset();
        }
    }
#endif
}