namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;

    internal class ShaderComplexityInstruction
    {
        internal enum Performance 
        {
            Arithmetic = 0,
            LoadOrSave,
            Texture,

            Begin = Arithmetic,
            End = Texture + 1,
        }

        [System.Flags]
        internal enum BoundedPerformance {
            None = 0,
            Arithmetic  = 1,
            LoadOrSave  = 2,
            Texture     = 4,
        }

        public float[] instructionsAll = new float[Performance.End - Performance.Begin];
        public BoundedPerformance boundedPerformance = BoundedPerformance.None;

        private const string KEY_ERROR = "ERROR:";
        private const string KEY_INSTRUCTION_EMITTED = "Instructions Emitted:";

        public int instructions {
            get {
                float total = 0;
                foreach (float count in instructionsAll)
                    total += count;

                return (int)Mathf.Ceil(total);
            }
        }

        public bool Parse(string output, out string error)
        {
            error = "";
            bool parsedResult = false;
            string[] lines = output.Split(new string[] { "\r\n", "\r", "\n" }, System.StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < lines.Length; i++)
            {
                string line = lines[i];
                if (line.IndexOf(KEY_ERROR) >= 0)
                {
                    error = $"{error}{line}\"\n\"";
                }
                else if (line.IndexOf(KEY_INSTRUCTION_EMITTED) >= 0)
                {
                    parsedResult = true;
                    string[] emitted = line.Substring(KEY_INSTRUCTION_EMITTED.Length + 1).Split(new string[] { "\t" }, System.StringSplitOptions.RemoveEmptyEntries);
                    if (emitted.Length != 4)
                    {
                        error = $"Not Expected Output Format:\"\n\"{output}";
                        break;
                    }

                    instructionsAll[Performance.Arithmetic - Performance.Begin] = float.Parse(emitted[0]);
                    instructionsAll[Performance.LoadOrSave - Performance.Begin] = float.Parse(emitted[1]);
                    instructionsAll[Performance.Texture - Performance.Begin] = float.Parse(emitted[2]);

                    boundedPerformance = BoundedPerformance.None;
                    string[] arrayBoundedPerformance = emitted[3].Split(new string[] { "," }, System.StringSplitOptions.RemoveEmptyEntries);
                    foreach (string strBoundedPerformance in arrayBoundedPerformance)
                    {
                        switch (emitted[3])
                        {
                            case "A":
                                boundedPerformance |= BoundedPerformance.Arithmetic;
                                break;
                            case "L/S":
                                boundedPerformance |= BoundedPerformance.LoadOrSave;
                                break;
                            case "T":
                                boundedPerformance |= BoundedPerformance.Texture;
                                break;
                            default:
                                error = $"Not Expected Bound Performance:\"\n\"{output}";
                                break;
                        }
                    }
                }
            }
            if (string.IsNullOrEmpty(error) && parsedResult == false)
            {
                error = $"Unhandled Output Format:\"\n\"{output}";
            }

            return string.IsNullOrEmpty(error);
        }

        public static BoundedPerformance CovertToBoundedPerformace(int value)
        {
            BoundedPerformance result = BoundedPerformance.None;
            if ((value & (int)BoundedPerformance.Arithmetic) > 0)
                result |= BoundedPerformance.Arithmetic;
            if ((value & (int)BoundedPerformance.LoadOrSave) > 0)
                result |= BoundedPerformance.LoadOrSave;
            if ((value & (int)BoundedPerformance.Texture) > 0)
                result |= BoundedPerformance.Texture;
            return result;
        }
    }
#endif
}