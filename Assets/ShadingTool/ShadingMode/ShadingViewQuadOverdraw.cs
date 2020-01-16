namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using System.Collections.Generic;

    [ExecuteAlways]
    internal class ShadingViewQuadOverdraw : MonoBehaviour 
    {
        private RenderTexture overdrawBuffer;
        
        private Material materialApply;
        private Material materialClear;

        public ShadingModeQuadOverdraw quadOverdraw;

        public void Enter(Camera camera)
        {
            // Must be ARGB32 but will get automatically converted to float or float4 or int or half, from your shader code declaration.
            if (overdrawBuffer == null || overdrawBuffer.width != camera.pixelWidth || overdrawBuffer.height != camera.pixelHeight)
            {
                if (overdrawBuffer)
                {
                    Utility.Destroy(overdrawBuffer);
                }

                overdrawBuffer = new RenderTexture(camera.pixelWidth, camera.pixelHeight, 0, RenderTextureFormat.ARGB32);
                overdrawBuffer.name = "Overdraw Buffer";
                overdrawBuffer.enableRandomWrite = true;
                overdrawBuffer.Create();
            }

            Graphics.ClearRandomWriteTargets();
            Graphics.SetRandomWriteTarget(1, overdrawBuffer);
        }

        public void Exit(bool destroy = true)
        {
            if (overdrawBuffer != null)
                Utility.Destroy(overdrawBuffer);

            Graphics.ClearRandomWriteTargets();

            if (destroy)
                Utility.Destroy(this);
        }

        public void Refresh()
        {
        }

        private void OnPreCull()
        {
            if (quadOverdraw == null)
            {
                Exit();
                return;
            }

            quadOverdraw.OnViewWillPreCull(overdrawBuffer);
            Refresh();
        }

        private void OnRenderImage(RenderTexture source, RenderTexture destination)
        {
            if (quadOverdraw == null)
            {
                Exit();
                return;
            }

            if (overdrawBuffer != null)
            {
                // apply
                if (materialApply == null)
                    materialApply = new Material(ShadingTool.resources.shaders.quadOverdrawApply);
                materialApply.SetTexture("RWQuadBuffer", overdrawBuffer);
                Graphics.Blit(source, destination, materialApply);
                //Graphics.Blit(source, destination);

                // clear
                if (materialClear == null)
                    materialClear = new Material(ShadingTool.resources.shaders.quadOverdrawClear);
                RenderTexture temporary = RenderTexture.GetTemporary(source.descriptor);
                Graphics.Blit(source, temporary, materialClear);
                RenderTexture.ReleaseTemporary(temporary);
            }
            else
                Graphics.Blit(source, destination);
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
