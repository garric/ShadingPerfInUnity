namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using UnityEditor;
    using System.Collections.Generic;

    internal class PostprocessAssetShader : AssetPostprocessor
    {
        private static readonly string UNITYPROJECT_SLN;
        private static bool NeedCompileShaders()
        {
            if (!Preferences.shadingModeSwitch)
                return false;

            if (!Preferences.complieImportedShader)
                return false;

            string fileSln = $"{Application.dataPath.Replace("Assets", string.Empty)}UnityProject.sln";
            if (!System.IO.File.Exists(fileSln)) // Unity need UnityProject.sln to open compiled shader file
                return false;

            return true;
        }

        static void OnPostprocessAllAssets(string[] importedAssets, string[] deletedAssets, string[] movedAssets, string[] movedFromAssetPaths)
        {
            if (!NeedCompileShaders())
                return;

            List<string> shaderAssets = new List<string>();

            foreach (string asset in importedAssets)
            {
                if (asset.Contains(".shader") &&  Preferences.IsInCompileImportedShaderPaths(asset))
                    shaderAssets.Add(asset);
            }

            for (int i = 0, imax = shaderAssets.Count; i < imax; i++)
            {
                string shaderAsset = shaderAssets[i];
                Shader shader = AssetDatabase.LoadAssetAtPath<Shader>(shaderAsset);
                if (shader == null)
                {
                    Debug.LogError($"PostprocessAssetShader Null Shader {shaderAsset}");
                    continue;
                }

                EditorUtility.DisplayProgressBar("Offline Compile Imported Shader", $"{shader.name} [{imax}/{(i + 1)}]", (i + 1) / (float)imax);
                ShadingTool.compiler.CompileShader(shader);
            }

            EditorUtility.ClearProgressBar();
        }
    }
#endif
}
