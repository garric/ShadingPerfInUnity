namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using System.IO;


    internal class ShaderComplexityVariant 
    {
        private const string CACHE_VERTEXSHADER = "shader.vert";
        private const string CACHE_FRAGMENTSHADER = "shader.frag";
        private const string CACHE_VERTEXSHADER_COMPLEXITY = "complexity.vert";
        private const string CACHE_FRAGMENTSHADER_COMPLEXITY = "complexity.frag";
        private const string CACHE_VERTEXSHADER_BAT = "bat.vert.bat";
        private const string CACHE_FRAGMENTSHADER_BAT = "bat.frag.bat";

        private const string COMPLEXITY_SEPARATOR = ":";
        private const string COMPLEXITY_VERSION = "version";
        private const string COMPLEXITY_KEYWORDS = "keywords";
        private const string COMPLEXITY_INSTRUCTIONS = "instructions";
        private const string COMPLEXITY_INSTRUCTIONS_SEPARATOR = "-";

        private string[] keywords = new string[0];
        public ShaderComplexityInstruction vertex = new ShaderComplexityInstruction();
        public ShaderComplexityInstruction fragment = new ShaderComplexityInstruction();

        public bool NoKeywords { get { return keywords.Length == 0; } }

        private static ShaderComplexityVariant m_default = new ShaderComplexityVariant();
        public static ShaderComplexityVariant Default { get {
                return m_default;
        } }

        public bool Load(string folderPathComplexity, string[] keywords)
        {
            this.keywords = keywords;

            if (!LoadShaderComplexityVariant(folderPathComplexity, true, vertex))
                return false;
            if (!LoadShaderComplexityVariant(folderPathComplexity, false, fragment))
                return false;

            return true;
        }

        private bool LoadShaderComplexityVariant(string folderPathComplexity, bool vertexShader, ShaderComplexityInstruction instrunction)
        {
            string filepathComplexity = $"{folderPathComplexity}/{(vertexShader ? CACHE_VERTEXSHADER_COMPLEXITY : CACHE_FRAGMENTSHADER_COMPLEXITY)}";
            if (!File.Exists(filepathComplexity))
                return false;

            string[] linesComplexity = File.ReadAllLines(filepathComplexity, System.Text.Encoding.ASCII);
            bool parseOk = false;
            foreach(string line in linesComplexity)
            {
                if (line.IndexOf(COMPLEXITY_INSTRUCTIONS) >= 0)
                {
                    string[] data = line.Substring(COMPLEXITY_INSTRUCTIONS.Length + COMPLEXITY_SEPARATOR.Length).Split(new string[] { COMPLEXITY_INSTRUCTIONS_SEPARATOR }, System.StringSplitOptions.RemoveEmptyEntries);
                    if (data.Length == 4)
                    {
                        parseOk = true;
                        instrunction.instructionsAll[(int)ShaderComplexityInstruction.Performance.Arithmetic] = float.Parse(data[0]);
                        instrunction.instructionsAll[(int)ShaderComplexityInstruction.Performance.LoadOrSave] = float.Parse(data[1]);
                        instrunction.instructionsAll[(int)ShaderComplexityInstruction.Performance.Texture] = float.Parse(data[2]);
                        instrunction.boundedPerformance = ShaderComplexityInstruction.CovertToBoundedPerformace(int.Parse(data[3]));
                    }

                    break;
                }
            }

            return parseOk;
        }

        public bool Save(string folderPathComplexity, ShaderOfflineCache.ShaderVariantLines shaderVariantLines)
        {
            keywords = shaderVariantLines.keywords;

            // vertex shader
            string filepathVertexShader = $"{folderPathComplexity}/{CACHE_VERTEXSHADER}";
            if (File.Exists(filepathVertexShader))
                File.Delete(filepathVertexShader);
            File.WriteAllLines(filepathVertexShader, shaderVariantLines.linesVertex, System.Text.Encoding.ASCII);

            // fragment shader
            string filepathFragmentShader = $"{folderPathComplexity}/{CACHE_FRAGMENTSHADER}";
            if (File.Exists(filepathFragmentShader))
                File.Delete(filepathFragmentShader);
            File.WriteAllLines(filepathFragmentShader, shaderVariantLines.linesFragment, System.Text.Encoding.ASCII);

            // create process
            if (!SaveShaderComplexityVariant(folderPathComplexity, shaderVariantLines.keywords, true, CACHE_VERTEXSHADER, vertex))
                return false;

            if (!SaveShaderComplexityVariant(folderPathComplexity, shaderVariantLines.keywords, false, CACHE_FRAGMENTSHADER, fragment))
                return false;

            return true;
        }

        private bool SaveShaderComplexityVariant(string folderPathComplexity, string[] keywords, bool vertexShader, string shaderFileName, ShaderComplexityInstruction instrunction)
        {
            string filepathComplexity = $"{folderPathComplexity}/{(vertexShader ? CACHE_VERTEXSHADER_COMPLEXITY : CACHE_FRAGMENTSHADER_COMPLEXITY)}";
            string[] linesComplexity = new string[3];
            linesComplexity[0] = $"{COMPLEXITY_VERSION}{COMPLEXITY_SEPARATOR}{ShaderOfflineCache.metaVersion}";
            linesComplexity[1] = $"{COMPLEXITY_KEYWORDS}{COMPLEXITY_SEPARATOR}";
            foreach (string keyword in keywords)
                linesComplexity[1] = $"{linesComplexity[1]} {keyword}";

            string arguments = "";
            if (vertexShader)
                arguments = $"-v {shaderFileName} -c {Preferences.maliCore} -s";
            else
                arguments = $"-f {shaderFileName} -c {Preferences.maliCore} -s";


            string[] linesBat = new string[2];
            linesBat[0] = $"\"{ Preferences.maliOfflineCompiler}\" {arguments}";
            linesBat[1] = "Pause";
            string fielpathBat = $"{folderPathComplexity}/{(vertexShader ? CACHE_VERTEXSHADER_BAT : CACHE_FRAGMENTSHADER_BAT)}";
            if (File.Exists(fielpathBat))
                File.Delete(fielpathBat);
            File.WriteAllLines(fielpathBat, linesBat, System.Text.Encoding.ASCII);

            string error = "";
            string output = "";
            Process.CreateProcess(Preferences.maliOfflineCompiler, arguments, folderPathComplexity, out error, out output);
            if (!string.IsNullOrEmpty(error))
            {
                UnityEditor.EditorUtility.DisplayDialog("Generate Shader Complexity", $"[ShaderComplexityVariant]{folderPathComplexity} @ {shaderFileName}fail:\n{error}", "Ok");
                return false;
            }

            if (!instrunction.Parse(output, out error))
            {
                UnityEditor.EditorUtility.DisplayDialog("Generate Shader Complexity", $"[ShaderComplexityVariant]{folderPathComplexity} @ {shaderFileName}fail:\n{error}", "Ok");
                return false;
            }

            linesComplexity[2] = $"{COMPLEXITY_INSTRUCTIONS}{COMPLEXITY_SEPARATOR}" +
                $"{ instrunction.instructionsAll[(int)ShaderComplexityInstruction.Performance.Arithmetic] }{COMPLEXITY_INSTRUCTIONS_SEPARATOR}" +
                $"{ instrunction.instructionsAll[(int)ShaderComplexityInstruction.Performance.LoadOrSave] }{COMPLEXITY_INSTRUCTIONS_SEPARATOR}" +
                $"{ instrunction.instructionsAll[(int)ShaderComplexityInstruction.Performance.Texture] }{COMPLEXITY_INSTRUCTIONS_SEPARATOR}" +
                $"{ (int)instrunction.boundedPerformance }";

            if (File.Exists(filepathComplexity))
                File.Delete(filepathComplexity);
            File.WriteAllLines(filepathComplexity, linesComplexity, System.Text.Encoding.ASCII);

            return true;
        }

        public bool MatchKeywords(string[] keywords)
        {
            if (this.keywords.Length != keywords.Length)
                return false;

            int index = 0;
            foreach(string keyword in this.keywords)
            {
                if (keyword != keywords[index++])
                    return false;
            }

            return true;
        }
    }
#endif
}
