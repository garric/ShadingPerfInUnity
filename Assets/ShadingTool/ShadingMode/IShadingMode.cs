namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using System.Collections.Generic;

    internal interface IShadingMode
    {
        void Enter(List<Camera> cameras);
        void Exit();

        void Refresh();
    }
#endif
}
