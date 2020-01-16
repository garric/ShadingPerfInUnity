namespace FA.ShadingTool 
{
#if UNITY_EDITOR

    using UnityEngine;
    using System.Collections.Generic;
    using UnityEditor;    

    public enum ShadingMode {
        ShaderComplexity = 0,
        QuadOverdraw = 1,

        None = int.MaxValue,
    }

    public delegate List<Camera> getShadingModeCameras(ShadingMode mode);

    internal class ShadingModeImps
    {
        public const string SECTION = "Shading Mode";
        public static SceneView.CameraMode[] cameraModes = new SceneView.CameraMode[] {
            new SceneView.CameraMode() { name = System.Enum.GetName(typeof(ShadingMode), (int)ShadingMode.ShaderComplexity), section = SECTION},
            new SceneView.CameraMode() { name = System.Enum.GetName(typeof(ShadingMode), (int)ShadingMode.QuadOverdraw), section = SECTION},
        };
        public static IShadingMode[] imps = new IShadingMode[] { new ShadingModeShaderComplexity(),  new ShadingModeQuadOverdraw(), };        
    }

    public class ShadingTool
    {
        private static SceneView lastActiveSceneView;

        public static ShaderOfflineCompiler compiler;
        public static Resources resources;

        public static getShadingModeCameras getCameras;

        [UnityEditor.InitializeOnLoadMethod]
        public static void SetupShadingTool()
        {
            Preferences.Load();
            compiler = new ShaderOfflineCompiler();
            string[] files = System.IO.Directory.GetFiles(Application.dataPath, "ShadingTool.cs", System.IO.SearchOption.AllDirectories);
            string assetpath = files[0].Replace("\\", "/").Replace(Application.dataPath.Replace("Assets", ""), "");
            string resourcePath = $"{assetpath.Substring(0, assetpath.LastIndexOf("/"))}/Resources.asset";
            resources = AssetDatabase.LoadAssetAtPath<Resources>(resourcePath);

            OnPreferencesShadingModeChange();

            EditorApplication.update -= DoUpdate;
            EditorApplication.update += DoUpdate;

            OnPreferencesPixelComplexityMaxCountChange();


            EditorApplication.playModeStateChanged -= OnPlayModeStateChange;
            EditorApplication.playModeStateChanged += OnPlayModeStateChange;
        }

        private static void DoUpdate()
        {
            if (lastActiveSceneView != SceneView.lastActiveSceneView)
            {
                if (lastActiveSceneView != null)
                {
                    // TODO: In fact, we can't execute the OnSceneViewRemove action
                    if (SceneView.sceneViews.Contains(lastActiveSceneView) == false)
                        OnSceneViewRemove(lastActiveSceneView);
                    
                    OnSceneViewAdd(SceneView.lastActiveSceneView);
                }
                else if (SceneView.lastActiveSceneView)
                {
                    OnSceneViewAdd(SceneView.lastActiveSceneView);
                }
            }
            lastActiveSceneView = SceneView.lastActiveSceneView;
        }

        private static void OnSceneViewAdd(SceneView sceneView)
        {
            //Debug.LogError($"OnSceneViewAdd {sceneView.cameraMode} {sceneView.name}");
            //sceneView.onValidateCameraMode += OnValidateCameraMode;
            sceneView.onCameraModeChanged += OnCameraModeChanged;
        }

        private static void OnSceneViewRemove(SceneView sceneView)
        {
            //Debug.LogError($"OnSceneViewRemove {sceneView.cameraMode} {sceneView.name}");
            //sceneView.onValidateCameraMode -= OnValidateCameraMode;
            sceneView.onCameraModeChanged -= OnCameraModeChanged;
        }

        private static bool OnValidateCameraMode(SceneView.CameraMode cameraMode)
        {
            ShadingMode mode = IsCustomCameraMode(cameraMode.name);
            return mode != ShadingMode.None;
        }

        private static void OnCameraModeChanged(SceneView.CameraMode cameraMode)
        {
            if (lastActiveSceneView && lastActiveSceneView.cameraMode.name == cameraMode.name)
            {
                foreach (IShadingMode shadingMode in ShadingModeImps.imps)
                    shadingMode.Exit();

                ShadingMode mode = IsCustomCameraMode(cameraMode.name);
                if (mode != ShadingMode.None)
                {
                    ShadingModeImps.imps[(int)mode].Enter(GetShadingModeCameras(mode));
                }
                else
                {
                    lastActiveSceneView.SetSceneViewShaderReplace(null, "");
                }
            }

            //Debug.LogError($"OnCameraModeChanged {cameraMode.name} {cameraMode.section} {cameraMode.drawMode}");
        }

        private static void ResetCameraMode()
        {
            if (lastActiveSceneView)
            {
                lastActiveSceneView.SetSceneViewShaderReplace(null, "");
                lastActiveSceneView.cameraMode = SceneView.GetBuiltinCameraMode(DrawCameraMode.Textured);
            }
        }

        private static ShadingMode IsCustomCameraMode(string cameraModeName)
        {
            ShadingMode mode = ShadingMode.None;
            if (System.Enum.TryParse(cameraModeName, out mode))
            {
                return mode;
            }
            return ShadingMode.None;
        }

        private static void OnPlayModeStateChange(PlayModeStateChange state)
        {
            if (state == PlayModeStateChange.EnteredPlayMode || state == PlayModeStateChange.EnteredEditMode)
                OnPreferencesShadingModeChange();
        }

        private static List<Camera> GetShadingModeCameras(ShadingMode mode)
        {
            if (getCameras != null)
                return getCameras(mode);

            List<Camera> cameras = new List<Camera>();

            if (Preferences.ShadingInSceneView() && lastActiveSceneView)
                cameras.Add(lastActiveSceneView.camera);

            if (Preferences.ShadingInGameView())
            {
                if (Camera.main == null)
                {
                    foreach (Camera camera in Camera.allCameras)
                    {
                        if (camera.gameObject.activeInHierarchy && !camera.name.Contains("UI"))
                        {
                            cameras.Add(camera);
                            break;
                        }
                    }
                }
                else
                    cameras.Add(Camera.main);
            }

            return cameras;
        }

        #region Preference Changes
        public static void OnPreferencesShadingModeChange()
        {
            foreach (IShadingMode shadingMode in ShadingModeImps.imps)
                shadingMode.Exit();

            SceneView.ClearUserDefinedCameraModes();
            ResetCameraMode();
            if (Preferences.shadingModeSwitch)
            {
                SceneView.AddCameraMode(ShadingModeImps.cameraModes[(int)ShadingMode.ShaderComplexity].name, ShadingModeImps.cameraModes[(int)ShadingMode.ShaderComplexity].section);
                SceneView.AddCameraMode(ShadingModeImps.cameraModes[(int)ShadingMode.QuadOverdraw].name, ShadingModeImps.cameraModes[(int)ShadingMode.QuadOverdraw].section);
            }
        }

        public static void OnPreferencesShadingModeViewChange()
        {
            string cameraModeName = lastActiveSceneView ? lastActiveSceneView.cameraMode.name : "";
            ShadingMode mode = IsCustomCameraMode(cameraModeName);
            if (mode != ShadingMode.None)
                OnCameraModeChanged(ShadingModeImps.cameraModes[(int)mode]);
        }

        public static void OnPreferencesSimulatePreDepthPassChange()
        {
            string cameraModeName = lastActiveSceneView ? lastActiveSceneView.cameraMode.name : "";
            ShadingMode mode = IsCustomCameraMode(cameraModeName);
            if (mode != ShadingMode.None)
            {
                OnCameraModeChanged(ShadingModeImps.cameraModes[(int)mode]);
            }                
        }

        public static void OnPreferencesPixelComplexityMaxCountChange()
        {
            string cameraModeName = lastActiveSceneView ? lastActiveSceneView.cameraMode.name : "";
            ShadingMode mode = IsCustomCameraMode(cameraModeName);
            if (mode == ShadingMode.ShaderComplexity)
            {
                foreach (IShadingMode shadingMode in ShadingModeImps.imps)
                    shadingMode.Refresh();
            }             
        }
        #endregion
    }
#endif
}
