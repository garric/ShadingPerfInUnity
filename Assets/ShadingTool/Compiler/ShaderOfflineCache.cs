namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using UnityEditor;
    using System.IO;
    using System.Collections.Generic;

    internal class ShaderOfflineCache
    {
        private const string PATH_SHADEROFFLINECACHE = "ShaderOfflineCache";
        private const string PATH_ASSETS = "Assets";

        private string m_root;
        public string root 
        {
            get {
                if (string.IsNullOrEmpty(m_root))
                    m_root = $"{Application.dataPath.Replace(PATH_ASSETS, string.Empty)}{PATH_SHADEROFFLINECACHE}";
                return m_root;
        } }

        private const string KEY_VARIANT = "in this variant";
        private const string KEY_VERTEXSHADER = "#ifdef VERTEX";
        private const string KEY_FRAGMENTSHADER = "#ifdef FRAGMENT";
        private const string KEY_SHADEREND = "#endif";

        private static readonly int LENGTH_VARIANT = KEY_VARIANT.Length;
        private static readonly int LENGTH_VERTEXSHADER = KEY_VERTEXSHADER.Length;
        private static readonly int LENGTH_FRAGMENTSHADER = KEY_FRAGMENTSHADER.Length;
        private static readonly int LENGTH_SHADEREND = KEY_SHADEREND.Length;        

        public static int metaVersion = 0;

        private enum LineState 
        {
            None,
            Variant,
            SeekingShaderVertex,
            VertexShader,
            SeekingFragmentShader,
            FragmentShader,
        }

        internal struct ShaderVariantLines
        {
            public string[] keywords;
            public int indexVertexBegin;
            public int indexVertexEnd;
            public int indexFragmentBegin;
            public int indexFragmentEnd;
            public string[] linesVertex;
            public string[] linesFragment;

            public static string[] GetLines(string[] allLines, int begin, int end)
            {
                string[] lines = new string[end - begin];
                for (int i = begin, imax = end; i < imax; i++)
                    lines[i - begin] = allLines[i];

                return lines;
            }
        }

        private LineState state = LineState.None;
        private ShaderVariantLines tempShaderVariantLines;
        private List<ShaderVariantLines> allShaderVariantsLines;
        private Dictionary<ShaderOfflineCacheKey, ShaderComplexity> cachedShaderComplexties = new Dictionary<ShaderOfflineCacheKey, ShaderComplexity>();

        public void Load()
        {
            cachedShaderComplexties.Clear();
            if (!Directory.Exists(root))
                return;

            foreach(string platform in Preferences.shaderPlatforms)
            {
                string rootPlatform = $"{root}/{platform}";
                if (!Directory.Exists(rootPlatform))
                    continue;

                foreach(string core in Preferences.maliMidgardGPUs)
                {
                    string rootPlatformGPU = $"{rootPlatform}/{core}";
                    if (!Directory.Exists(rootPlatformGPU))
                        continue;

                    string[] folders = Directory.GetDirectories(rootPlatformGPU);
                    foreach(string folder in folders)
                    {
                        string cachedShaderPath = $"{folder.FormatSlash()}";
                        string formattedShadername = new DirectoryInfo(cachedShaderPath).Name;

                        ShaderOfflineCacheKey key = new ShaderOfflineCacheKey(platform, core, formattedShadername);
                        key.folderpath = cachedShaderPath;

                        cachedShaderComplexties[key] = new ShaderComplexity();
                        cachedShaderComplexties[key].Load(key);
                    }
                }
            }
        }

        public bool Exist(Material material, out ShaderOfflineCacheKey key, bool checkCachedShaderPath = true)
        {
            //string guid = ""; // ???
            //long fileId = 0;
            //if (AssetDatabase.TryGetGUIDAndLocalFileIdentifier(material.shader, out guid, out fileId))
            //{

            //}

            string formattedShadername = ShaderOfflineCacheKey.FormateShaderName(material.shader.name);
            key = ShaderOfflineCacheKey.GetKey(formattedShadername);

            bool exist = true;

            if (checkCachedShaderPath)
            {
                string cachedShaderPath = "";
                exist = CheckCachedShaderPath(key.formattedShadername, out cachedShaderPath);
                key.folderpath = cachedShaderPath;
            }

            if (!cachedShaderComplexties.ContainsKey(key) || !cachedShaderComplexties[key].Contains(material))
            {
                exist = false;
            }

            return exist;
        }

        public bool CheckCachedShaderPath(string formattedShadername, out string cachedShaderPath)
        {
            bool exist = true;
            if (!Directory.Exists(root))
            {
                exist = false;
                Directory.CreateDirectory(root);
            }

            string rootPlatform = $"{root}/{Preferences.shaderPlatform}";
            if (!Directory.Exists(rootPlatform))
            {
                exist = false;
                Directory.CreateDirectory(rootPlatform);
            }
            string rootPlatformGPU = $"{rootPlatform}/{Preferences.maliCore}";
            if (!Directory.Exists(rootPlatformGPU))
            {
                exist = false;
                Directory.CreateDirectory(rootPlatformGPU);
            }

            cachedShaderPath = $"{rootPlatformGPU}/{formattedShadername}";
            if (!Directory.Exists(cachedShaderPath))
            {
                exist = false;
                Directory.CreateDirectory(cachedShaderPath);
            }

            return exist;
        }

        public void CacheCompiledShader(string compiledFilepath,ShaderOfflineCacheKey key)
        {
            allShaderVariantsLines = new List<ShaderVariantLines>();
            string[] alllines = compiledFilepath.ReadAllLines();
            state = LineState.None;
            for(int i = 0; i < alllines.Length; i++)
            {
                string line = alllines[i];
                if (state == LineState.None)
                    i = ProcessLineStateVariant(alllines, i);
                else if (state == LineState.SeekingShaderVertex)
                    i = ProcessLineStateShaderVertex(alllines, i);
                else if (state == LineState.SeekingFragmentShader)
                    i = ProcessLineStateShaderFragment(alllines, i);
            }

            if (state != LineState.None)
            {
                EditorUtility.DisplayDialog("Cache Compiled Shader", $"{compiledFilepath} parse faile at state {state}", "Ok");
            }
            else if (allShaderVariantsLines.Count > 0)
                Save(key, alllines);
        }

        private int ProcessLineStateVariant(string[] alllines, int index)
        {
            for(; index < alllines.Length; index++)
            {
                if (alllines[index].Contains(KEY_VARIANT))
                {
                    state = LineState.Variant;
                    break;
                }
            }

            if (state == LineState.Variant)
            {
                tempShaderVariantLines = new ShaderVariantLines();
                string lineEnd = alllines[index].Substring(alllines[index].IndexOf(KEY_VARIANT) + LENGTH_VARIANT + 1); // 1 means punctuation mark
                //Debug.LogError(alllines[index] + " " + lineEnd);
                tempShaderVariantLines.keywords = lineEnd.Split(new string[] { " " }, System.StringSplitOptions.RemoveEmptyEntries);
                
                state = LineState.SeekingShaderVertex;
            }

            return index;
        }

        private int ProcessLineStateShaderVertex(string[] alllines, int index)
        {
            for (; index < alllines.Length; index++)
            {
                if (alllines[index].Contains(KEY_VERTEXSHADER))
                {
                    state = LineState.VertexShader;
                    break;
                }
            }

            if (state == LineState.VertexShader)
            {
                ++index;
                tempShaderVariantLines.indexVertexBegin = index;
                for (; index < alllines.Length; index++)
                {
                    if (alllines[index].Contains(KEY_SHADEREND) && alllines[index + 1].Contains(KEY_FRAGMENTSHADER))
                    {
                        state = LineState.SeekingFragmentShader;
                        break;
                    }
                }
            }
            if (state == LineState.SeekingFragmentShader)
            {
                tempShaderVariantLines.indexVertexEnd = index;
            }

            return index;
        }

        private int ProcessLineStateShaderFragment(string[] alllines, int index)
        {
            for (; index < alllines.Length; index++)
            {
                if (alllines[index].Contains(KEY_FRAGMENTSHADER))
                {
                    state = LineState.FragmentShader;
                    break;
                }
            }

            if (state == LineState.FragmentShader)
            {
                ++index;
                tempShaderVariantLines.indexFragmentBegin = index;
                for (; index < alllines.Length; index++)
                {
                    if (alllines[index].Contains(KEY_SHADEREND) && alllines[index - 1].Trim().Length == 0 && alllines[index + 1].Trim().Length == 0)
                    {
                        state = LineState.None;
                        break;
                    }
                }
            }
            if (state == LineState.None)
            {
                tempShaderVariantLines.indexFragmentEnd = index;
                allShaderVariantsLines.Add(tempShaderVariantLines);
            }

            return index;
        }

        private void Save(ShaderOfflineCacheKey key, string[] allines)
        {
            if (!cachedShaderComplexties.ContainsKey(key))
                cachedShaderComplexties.Add(key, new ShaderComplexity());
            cachedShaderComplexties[key].Clear();

            for (int i = 0; i < allShaderVariantsLines.Count; i++)
            {
                ShaderVariantLines shaderVariantLines = allShaderVariantsLines[i];
                shaderVariantLines.linesVertex = ShaderVariantLines.GetLines(allines, shaderVariantLines.indexVertexBegin, shaderVariantLines.indexVertexEnd);
                shaderVariantLines.linesFragment = ShaderVariantLines.GetLines(allines, shaderVariantLines.indexFragmentBegin, shaderVariantLines.indexFragmentEnd);

                cachedShaderComplexties[key].Add(key.folderpath, shaderVariantLines);
            }
        }

        public ShaderComplexityVariant GetComplexity(Material material)
        {
            ShaderOfflineCacheKey key = null;
            if (material && Exist(material, out key, false))
                return cachedShaderComplexties[key].Find(material);
            else
                return ShaderComplexityVariant.Default;
        }

        public void Clear(bool all)
        {
            if (!Directory.Exists(root))
                return;

            if (all)
            {
                Directory.Delete(root, true);
                EditorUtility.DisplayDialog("Clear Shader Cache All", $"All files under {root} are deleted!", "Ok");
                return;
            }

            string rootPlatform = $"{root}/{Preferences.shaderPlatform}";
            if (!Directory.Exists(rootPlatform))
                return;

            string rootPlatformGPU = $"{rootPlatform}/{Preferences.maliCore}";
            if (!Directory.Exists(rootPlatformGPU))
            {
                EditorUtility.DisplayDialog("Clear Shader Cache", $"All files under {rootPlatformGPU} are deleted!", "Ok");
                return;
            }                

            Directory.Delete(rootPlatformGPU, true);
        }
    }
#endif
}
