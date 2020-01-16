namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using System.Collections.Generic;
    using UnityEngine.SceneManagement;
    using System.Reflection;
    using System.IO;

    internal static class Utility
    {
        public static List<T> FindObjectsOfAll<T>() where T : Object
        {
            List<T> objects = new List<T>();
            foreach(T obj in Object.FindObjectsOfType<T>())
                objects.Add(obj);

            //System.Type type = typeof(T);
            //for (int i = 0; i < SceneManager.sceneCount; i++)
            //{
            //    Scene scene = SceneManager.GetSceneAt(i);
            //    if (!scene.isLoaded)
            //        continue;

            //    List<GameObject> childs = new List<GameObject>();
            //    scene.GetRootGameObjects(childs);
            //    while (childs.Count > 0)
            //    {
            //        GameObject child = childs[0];                    
            //        for (int k = 0; k < child.transform.childCount; k++)
            //            childs.Add(child.transform.GetChild(k).gameObject);

            //        childs.RemoveAt(0);

            //        if (type != typeof(GameObject))
            //        {
            //            foreach (T comp in child.GetComponents<T>())
            //                objects.Add(comp);
            //        }
            //        else
            //            objects.Add(child as T);                    
            //    }
            //}

            return objects;
        }

        public static string Cancat(this string[] stringArray)
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            foreach (string str in stringArray)
                sb.Append($"{str}, ");
            return sb.ToString();
        }

        public static string[] ReadAllLines(this string filepath)
        {
            string[] alllines = new string[0];
            if (File.Exists(filepath))
            {
                File.SetAttributes(filepath, File.GetAttributes(filepath) & ~FileAttributes.ReadOnly);
                alllines = File.ReadAllLines(filepath, System.Text.Encoding.ASCII);
            }
            return alllines;
        }

        public static string FormatSlash(this string path)
        {
            return path.Replace("\\", "/");
        }

        public static void Destroy(Object target)
        {
            if (Application.isPlaying)
                Object.Destroy(target);
            else
                Object.DestroyImmediate(target);
        }

        // https://gitlab.thecdm.ca/xr_lab/Cluster/blob/master/Assets/AmplifyShaderEditor/AmplifyShaderEditor/Plugins/Editor/Utils/CustomShaderInspector.cs
        private static System.Type type = null;
        public static System.Type Type { get { return (type == null) ? type = System.Type.GetType("UnityEditor.ShaderUtil, UnityEditor") : type; } }

        public static void OpenCompiledShader(Shader shader, int mode, int customPlatformsMask, bool includeAllVariants)
        {
            Type.InvokeMember("OpenCompiledShader", BindingFlags.Static | BindingFlags.NonPublic | BindingFlags.InvokeMethod, null, null, new object[] { shader, mode, customPlatformsMask, includeAllVariants });
        }
    }
#endif
}
