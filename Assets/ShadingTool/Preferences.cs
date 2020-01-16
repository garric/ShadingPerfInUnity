namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using UnityEditor;
    using UnityEditor.Rendering;

    public static class Preferences 
    {
        internal static class Keys 
        {
            public const string maliOfflineCompiler = "ShadingTool.Mali.OfflineCompiler";
            public const string maliCore = "ShadingTool.Mali.Core";

            public const string shaderPlatform = "ShadingTool.Shader.Platform";
            public const string complieImportedShader = "ShadingTool.Shader.ComplieImportedShader";            
            public const string complieImportedShaderPaths = "ShadingTool.Shader.ComplieImportedShaderPaths";
            public const string complieImportedShaderPathsCount = "ShadingTool.Shader.ComplieImportedShaderPathsCount";

            public const string shadeingModeSwitch = "ShadingTool.ShadingMode.Switch";
            public const string simulateDepthPrePass = "ShadingTool.ShadingMode.SimulateDepthPrePass";
            public const string shadeingModeView = "ShadingTool.ShadingMode.View";

            public const string maxES2PixelShaderAdditiveComplexityCount = "ShadingTool.Instrunctions.PixelES2";
            public const string maxES3PixelShaderAdditiveComplexityCount = "ShadingTool.Instrunctions.PixelES3";
        }

        const string DEFAULT_MALI_MIDGARD_GPU = "Mali-T860";
        public static string[] maliMidgardGPUs = { "Mali-T880", "Mali-T860", "Mali-T830", "Mali-T820", "Mali-T760", "Mali-T720" };

        enum ShaderPlatform 
        {
            GLES3x,
            GLES20,
        }

        enum View 
        {
            Scene,
            Game,
            Both,
        }

        static int DEFAULT_SHADER_PLATFORM = (int)ShaderPlatform.GLES3x;
        public static string[] shaderPlatforms = { ShaderCompilerPlatform.GLES3x.ToString(), ShaderCompilerPlatform.GLES20.ToString() };

        const int DEFAULT_SHADINGMODE_VIEW = (int)View.Scene;
        private static string[] shadingModeViews = { View.Scene.ToString(), View.Game.ToString(), View.Both.ToString() };

        static string m_MaliOfflineCompiler = "";
        internal static string maliOfflineCompiler {
            get { return m_MaliOfflineCompiler; }
            set { TrySave(ref m_MaliOfflineCompiler, value, Keys.maliOfflineCompiler); }
        }

        static string m_MaliCore = DEFAULT_MALI_MIDGARD_GPU;
        internal static string maliCore {
            get { return m_MaliCore; }
            set { TrySave(ref m_MaliCore, value, Keys.maliCore); }
        }

        static int m_ShaderPlatformIndex = DEFAULT_SHADER_PLATFORM;
        internal static int shaderPlatformIndex {
            get { return m_ShaderPlatformIndex; }
            set { TrySave(ref m_ShaderPlatformIndex, value, Keys.shaderPlatform); }
        }

        internal static string shaderPlatform {
            get { return shaderPlatforms[m_ShaderPlatformIndex]; }
        }

        static bool m_ShadingModeSwitch = false;
        public static bool shadingModeSwitch {
            get { return m_ShadingModeSwitch; }
            set { TrySave(ref m_ShadingModeSwitch, value, Keys.shadeingModeSwitch); }
        }
        
        static bool m_ComplieImportedShader = true;
        public static bool complieImportedShader {
            get { return m_ComplieImportedShader; }
            set { TrySave(ref m_ComplieImportedShader, value, Keys.complieImportedShader); }
        }

        static string[] m_ComplieImportedShaderPaths = new string[0];

        static bool m_SimulateDepthPrePass = true;
        public static bool simulateDepthPrePass {
            get { return m_SimulateDepthPrePass; }
            set { TrySave(ref m_SimulateDepthPrePass, value, Keys.simulateDepthPrePass); }
        }

        static int m_ShadingModeViewIndex = DEFAULT_SHADINGMODE_VIEW;
        private static int shadingModeView {
            get { return m_ShadingModeViewIndex; }
            set { TrySave(ref m_ShadingModeViewIndex, value, Keys.shadeingModeView); }
        }

        private const int DEFAULT_PIXELSHADERADDITIVECOMPLEXITYCOUNT_ES2 = 600;
        static int m_MaxES2PixelShaderAdditiveComplexityCount = DEFAULT_PIXELSHADERADDITIVECOMPLEXITYCOUNT_ES2;
        public static int maxES2PixelShaderAdditiveComplexityCount {
            get { return m_MaxES2PixelShaderAdditiveComplexityCount; }
            set { TrySave(ref m_MaxES2PixelShaderAdditiveComplexityCount, value, Keys.maxES2PixelShaderAdditiveComplexityCount); }
        }

        private const int DEFAULT_PIXELSHADERADDITIVECOMPLEXITYCOUNT_ES3 = 800;
        static int m_MaxES3PixelShaderAdditiveComplexityCount = 800;
        public static int maxES3PixelShaderAdditiveComplexityCount {
            get { return m_MaxES3PixelShaderAdditiveComplexityCount; }
            set { TrySave(ref m_MaxES3PixelShaderAdditiveComplexityCount, value, Keys.maxES3PixelShaderAdditiveComplexityCount); }
        }

        private static string GetComplieImportedShaderPathsKey(int index)
        {
            return $"{Keys.complieImportedShaderPaths}_{index}";
        }

        private static void SaveCompileImportedShaderPaths()
        {
            int count = m_ComplieImportedShaderPaths.Length;
            EditorPrefs.SetInt(Keys.complieImportedShaderPathsCount, count);
            for (int i = 0; i < count; i++)
                EditorPrefs.SetString(GetComplieImportedShaderPathsKey(i), m_ComplieImportedShaderPaths[i]);
        }

        public static bool IsInCompileImportedShaderPaths(string assetPath)
        {
            for (int i = 0; i < m_ComplieImportedShaderPaths.Length; i++)
            {
                if (assetPath.Contains(m_ComplieImportedShaderPaths[i]))
                    return true;
            }
            return false;
        }

        public static bool ShadingInSceneView()
        {
            return shadingModeView == (int)View.Scene || shadingModeView == (int)View.Both;
        }

        public static bool ShadingInGameView()
        {
            return shadingModeView == (int)View.Game || shadingModeView == (int)View.Both;
        }

        internal static void Load()
        {
            m_MaliOfflineCompiler = EditorPrefs.GetString(Keys.maliOfflineCompiler, "");
            m_MaliCore = EditorPrefs.GetString(Keys.maliCore, DEFAULT_MALI_MIDGARD_GPU);

            m_ShaderPlatformIndex = EditorPrefs.GetInt(Keys.shaderPlatform, DEFAULT_SHADER_PLATFORM);
            m_ComplieImportedShader = EditorPrefs.GetBool(Keys.complieImportedShader, true);

            int complieImportedShaderPathsCount = EditorPrefs.GetInt(Keys.complieImportedShaderPathsCount, 0);
            m_ComplieImportedShaderPaths = new string[complieImportedShaderPathsCount];
            for (int i = 0; i < complieImportedShaderPathsCount; i++)
                m_ComplieImportedShaderPaths[i] = EditorPrefs.GetString(GetComplieImportedShaderPathsKey(i));

            m_ShadingModeSwitch = EditorPrefs.GetBool(Keys.shadeingModeSwitch, false);
            m_SimulateDepthPrePass = EditorPrefs.GetBool(Keys.simulateDepthPrePass, false);
            m_ShadingModeViewIndex = EditorPrefs.GetInt(Keys.shadeingModeView, DEFAULT_SHADINGMODE_VIEW);

            m_MaxES3PixelShaderAdditiveComplexityCount = EditorPrefs.GetInt(Keys.maxES3PixelShaderAdditiveComplexityCount, DEFAULT_PIXELSHADERADDITIVECOMPLEXITYCOUNT_ES2);
            m_MaxES2PixelShaderAdditiveComplexityCount = EditorPrefs.GetInt(Keys.maxES2PixelShaderAdditiveComplexityCount, DEFAULT_PIXELSHADERADDITIVECOMPLEXITYCOUNT_ES3);
        }

        [SettingsProvider]
        static SettingsProvider PreferenceGUI()
        {
            return new SettingsProvider("Preferences/Shading Tool", SettingsScope.User)
            {
                guiHandler = searchContext => OpenGUI()
            };
        }

        static void OpenGUI()
        {
            EditorGUILayout.Space();
            bool repaint = false;

            EditorGUILayout.BeginHorizontal();
            maliOfflineCompiler = EditorGUILayout.TextField("Mali Offline Compiler", maliOfflineCompiler);
            if (GUILayout.Button("browser", GUILayout.Width(80)))
            {
                maliOfflineCompiler = EditorUtility.OpenFilePanel("Select Mali Offline Compiler", "", "exe");
            }
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.PrefixLabel("Mali Core");
            int maliCoreIndex = EditorGUILayout.Popup(FindIndex(maliMidgardGPUs, maliCore, DEFAULT_MALI_MIDGARD_GPU), maliMidgardGPUs, GUILayout.Width(100));
            maliCore = maliMidgardGPUs[maliCoreIndex];
            GUILayout.FlexibleSpace();

            LinkButton("BenchMark", "https://gfxbench.com/result.jsp");
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.PrefixLabel("Shader Platform");
            shaderPlatformIndex = EditorGUILayout.Popup(FindIndex(shaderPlatforms, shaderPlatform, shaderPlatforms[DEFAULT_SHADER_PLATFORM]), shaderPlatforms, GUILayout.Width(200));
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.PrefixLabel("Clear Shader Cache");
            if (GUILayout.Button(new GUIContent("clear", $"clear current shader caches of {maliCore} and {shaderPlatform}"), GUILayout.Width(100)))
                ShadingTool.compiler.Clear(false);
            if (GUILayout.Button(new GUIContent("clear all", "clear all shader caches"), GUILayout.Width(100)))
                ShadingTool.compiler.Clear(true);
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.Space();
            EditorGUILayout.LabelField("ShadingMode:");
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.PrefixLabel("ShadingMode Switch");
            EditorGUI.BeginChangeCheck();
            shadingModeSwitch = EditorGUILayout.Toggle(shadingModeSwitch);
            if (EditorGUI.EndChangeCheck())
                ShadingTool.OnPreferencesShadingModeChange();
            EditorGUILayout.EndHorizontal();
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.PrefixLabel("Compile Imported Shader");
            complieImportedShader = EditorGUILayout.Toggle(complieImportedShader);
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.Space();
            EditorGUI.BeginChangeCheck();
            EditorGUILayout.BeginVertical();
            EditorGUILayout.PrefixLabel(new GUIContent("Imported Shader Paths", "Shaders in those folders will trigger offline compiling when imported"));
            int complieImportedShaderPathsAddIndex = -1;
            int complieImportedShaderPathsDeleteIndex = -1;
            int complieImportedShaderPathsCount = m_ComplieImportedShaderPaths.Length;
            for (int i = 0, imax = complieImportedShaderPathsCount; i < imax; i++)
            {
                EditorGUILayout.BeginHorizontal();
                GUI.enabled = false;
                m_ComplieImportedShaderPaths[i] = EditorGUILayout.TextField("", m_ComplieImportedShaderPaths[i]);
                GUI.enabled = true;
                if (GUILayout.Button("browser", GUILayout.Width(80)))
                {
                    m_ComplieImportedShaderPaths[i] = EditorUtility.OpenFolderPanel("Select Shader Path Which needs to be compiled when import", "", "");
                    m_ComplieImportedShaderPaths[i] = "Assets" + m_ComplieImportedShaderPaths[i].Replace(Application.dataPath, "");
                }                

                if (GUILayout.Button("-", GUILayout.Width(40)))
                {
                    complieImportedShaderPathsDeleteIndex = i;
                }
                //if (GUILayout.Button("+", GUILayout.Width(40)))
                //{
                //    complieImportedShaderPathsAddIndex = i;
                //}
                EditorGUILayout.EndHorizontal();

                if (complieImportedShaderPathsDeleteIndex >= 0 || complieImportedShaderPathsAddIndex >= 0)
                    break;
            }
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.Space();
            if (GUILayout.Button("+", GUILayout.Width(40)))
            {
                complieImportedShaderPathsAddIndex = complieImportedShaderPathsCount;
            }
            EditorGUILayout.EndHorizontal();
            EditorGUILayout.EndVertical();
            if (complieImportedShaderPathsDeleteIndex >= 0)
            {
                repaint = true;                
                string[] newPaths = new string[complieImportedShaderPathsCount - 1];
                int indexPath = 0;
                for (int i = 0, imax = complieImportedShaderPathsCount; i < imax; i++)
                {
                    if (i != complieImportedShaderPathsDeleteIndex)
                        newPaths[indexPath++] = m_ComplieImportedShaderPaths[i];
                }
                m_ComplieImportedShaderPaths = newPaths;
            }
            if (complieImportedShaderPathsAddIndex >= 0)
            {
                repaint = true;
                string[] newPaths = new string[complieImportedShaderPathsCount + 1];
                for (int i = 0, imax = complieImportedShaderPathsCount; i < imax; i++)
                    newPaths[i] = m_ComplieImportedShaderPaths[i];
                m_ComplieImportedShaderPaths = newPaths;
            }            
            if (EditorGUI.EndChangeCheck())
                repaint = true;
            if (repaint)
            {
                SaveCompileImportedShaderPaths();
                return;
            }

            EditorGUILayout.Space();
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.PrefixLabel("Simulate Depth Pre Pass");
            EditorGUI.BeginChangeCheck();
            simulateDepthPrePass = EditorGUILayout.Toggle(simulateDepthPrePass);
            if (EditorGUI.EndChangeCheck())
                ShadingTool.OnPreferencesSimulatePreDepthPassChange();
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.PrefixLabel("Shading Mode View");
            EditorGUI.BeginChangeCheck();
            shadingModeView = EditorGUILayout.Popup(FindIndex(shadingModeViews, shadingModeViews[shadingModeView], shaderPlatforms[DEFAULT_SHADINGMODE_VIEW]), shadingModeViews, GUILayout.Width(100));
            if (EditorGUI.EndChangeCheck())
                ShadingTool.OnPreferencesShadingModeViewChange();
            EditorGUILayout.EndHorizontal();


            EditorGUILayout.Space();
            EditorGUILayout.LabelField("Complexity:");

            using (new EditorGUI.DisabledGroupScope(m_ShaderPlatformIndex != (int)ShaderPlatform.GLES20))
            {
                EditorGUILayout.BeginHorizontal();
                EditorGUILayout.PrefixLabel("Max Pixel Instructions ES2");
                EditorGUI.BeginChangeCheck();
                string instrunctionsString = EditorGUILayout.TextField(maxES2PixelShaderAdditiveComplexityCount.ToString());
                int instrunctionsCount = 0;
                if (int.TryParse(instrunctionsString, out instrunctionsCount))
                    maxES2PixelShaderAdditiveComplexityCount = instrunctionsCount;
                if (EditorGUI.EndChangeCheck())
                    ShadingTool.OnPreferencesPixelComplexityMaxCountChange();
                EditorGUILayout.EndHorizontal();
            }

            using (new EditorGUI.DisabledGroupScope(m_ShaderPlatformIndex != (int)ShaderPlatform.GLES3x))
            {
                EditorGUILayout.BeginHorizontal();
                EditorGUILayout.PrefixLabel("Max Pixel Instructions ES3");
                EditorGUI.BeginChangeCheck();
                string instrunctionsString = EditorGUILayout.TextField(maxES3PixelShaderAdditiveComplexityCount.ToString());
                int instrunctionsCount = 0;
                if (int.TryParse(instrunctionsString, out instrunctionsCount))
                    maxES3PixelShaderAdditiveComplexityCount = instrunctionsCount;
                if (EditorGUI.EndChangeCheck())
                    ShadingTool.OnPreferencesPixelComplexityMaxCountChange();
                EditorGUILayout.EndHorizontal();
            }
        }

        static int FindIndex(string[] sources, string value, string defaultValue)
        {
            for (int i = 0, imax = sources.Length; i < imax; i++)
            {
                if (sources[i] == value)
                    return i;
            }
            for (int i = 0, imax = sources.Length; i < imax; i++)
            {
                if (sources[i] == defaultValue)
                    return i;
            }
            return 0;
        }

        // https://xinyustudio.wordpress.com/2015/01/21/unity3d-how-to-create-a-link-button-with-fun/
        static void LinkButton(string caption, string url)
        {
            var style = GUI.skin.label;
            style.richText = true;
            caption = string.Format("<color=#0000FF>{0}</color>", caption);

            bool bClicked = GUILayout.Button(caption, style);

            var rect = GUILayoutUtility.GetLastRect();
            rect.width = style.CalcSize(new GUIContent(caption)).x;
            EditorGUIUtility.AddCursorRect(rect, MouseCursor.Link);

            if (bClicked)
                Application.OpenURL(url);
        }

        static void TrySave<T>(ref T field, T newValue, string key)
        {
            if (field.Equals(newValue))
                return;

            if (typeof(T) == typeof(float))
                EditorPrefs.SetFloat(key, (float)(object)newValue);
            else if (typeof(T) == typeof(int))
                EditorPrefs.SetInt(key, (int)(object)newValue);
            else if (typeof(T) == typeof(bool))
                EditorPrefs.SetBool(key, (bool)(object)newValue);
            else if (typeof(T) == typeof(string))
                EditorPrefs.SetString(key, (string)(object)newValue);

            field = newValue;
        }

        public static int GetMaxShaderComplexityCount()
        {
            switch(shaderPlatformIndex)
            {
                case (int)ShaderPlatform.GLES3x:
                    return maxES3PixelShaderAdditiveComplexityCount;
                case (int)ShaderPlatform.GLES20:
                    return maxES2PixelShaderAdditiveComplexityCount;
                default:
                    return maxES2PixelShaderAdditiveComplexityCount;
            }
        }
    }
#endif
}
