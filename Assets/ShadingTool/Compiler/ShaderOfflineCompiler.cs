namespace FA.ShadingTool 
{
    // TODO: shader variants
#if UNITY_EDITOR
    using UnityEngine;
    using UnityEditor;
    using UnityEditor.Rendering;
    using System.Collections.Generic;

    public class ShaderOfflineCompiler
    {
        private Dictionary<string, ShaderCompilerPlatform> platformMasks = new Dictionary<string, ShaderCompilerPlatform>();
        private ShaderOfflineCache cache = new ShaderOfflineCache();

        internal ShaderOfflineCompiler()
        {
            platformMasks[ShaderCompilerPlatform.GLES3x.ToString()] = ShaderCompilerPlatform.GLES3x;
            platformMasks[ShaderCompilerPlatform.GLES20.ToString()] = ShaderCompilerPlatform.GLES20;

            Load();
        }

        private void Load()
        {
            cache.Load();
        }

        internal bool IsExist()
        {
            const string MaliWebsite = "https://developer.arm.com/tools-and-software/graphics-and-gaming/arm-mobile-studio/downloads";
            if (string.IsNullOrEmpty(Preferences.maliOfflineCompiler) || !Preferences.maliOfflineCompiler.Contains("malioc.exe"))
            {
                string content = "You have to config  Mali Offline Compiler path correctly first in Shading Tool Of Preference Window. You can download it from:\n" +
                    "[P4]//FA/Dev/Tools/Arm_Mobile_Studio_2019.2_windows.exe\n" +
                    "[Website]" + MaliWebsite;

                int option = EditorUtility.DisplayDialogComplex("Mali Offline Complier", content, "Mali Website", "Close", "Config Now");
                switch(option)
                {
                    case 0:
                        Application.OpenURL(MaliWebsite);
                        break;
                    case 1:
                        break;
                    case 2:
                        SettingsService.OpenUserPreferences("Preferences/Shading Tool");
                        break;
                }

                return false;
            }

            return true;
        }

        internal bool CompileMaterial(Material material)
        {
            ShaderOfflineCacheKey key = null;
            if (cache.Exist(material, out key))
                return true;

            bool compileShaderSuccess = CompileShader(material.shader, key); // compile
            if (compileShaderSuccess)
            Debug.Log($"==================================offline compile shader success {material.shader.name} {material.shaderKeywords.Cancat()}==================================");
            else
                Debug.LogError($"==================================offline compile shader fail {material.shader.name} {material.shaderKeywords.Cancat()}==================================");

            return compileShaderSuccess;
        }

        internal bool CompileShader(Shader shader, ShaderOfflineCacheKey key)
        {            
            string formattedShadername = ShaderOfflineCacheKey.FormateShaderName(shader.name);
            if (key == null)
            {
                key = ShaderOfflineCacheKey.GetKey(formattedShadername);

                string cachedShaderPath = "";                
                cache.CheckCachedShaderPath(formattedShadername, out cachedShaderPath);
                key.folderpath = cachedShaderPath;
            }

            int currentMode = 3; //"Custom:" // EditorPrefs.GetInt("ShaderInspectorPlatformMode", 1); // currentMode in ShaderInspector.cs
            int currentPlatformsMask = GetShaderPlatformMask();
            bool includeAllVariants = false; // Skip unused shader_features
            Utility.OpenCompiledShader(shader, currentMode, currentPlatformsMask, includeAllVariants);

            // cache
            string compiledFilepath = $"{Application.dataPath.Replace("Assets", string.Empty)}Temp/Compiled";
            string[] array = shader.name.Split(new string[] { "/" }, System.StringSplitOptions.RemoveEmptyEntries);
            foreach (string str in array)
                compiledFilepath = $"{compiledFilepath}-{str}";
            compiledFilepath = $"{compiledFilepath}.shader";
            if (!System.IO.File.Exists(compiledFilepath))
                Debug.LogError($"ShaderOfflineCompiler compiler {shader.name} fail!");
            else
                cache.CacheCompiledShader(compiledFilepath, key);

            return true;
        }

        private int GetShaderPlatformMask()
        {
            if (platformMasks.ContainsKey(Preferences.shaderPlatform))
                return 1 << (int)platformMasks[Preferences.shaderPlatform];

            return 1 << (int)ShaderCompilerPlatform.GLES3x;
        }

        internal ShaderComplexityVariant GetComplexity(Material material)
        {
            return cache.GetComplexity(material);
        }

        public bool CompileShader(Shader shader)
        {
            return CompileShader(shader, null);
        }

        public void Clear(bool all)
        {
            cache.Clear(all);
        }
    }
#endif
}
