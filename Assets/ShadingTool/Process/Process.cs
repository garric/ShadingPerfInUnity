namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    public static class Process
    {
        /// <summary>
        /// // TODO: async
        /// https://www.cnblogs.com/Elson8080/p/4424461.html
        /// </summary>
        /// <param name="workingDirectory"></param>
        public static void CreateProcess(string filename, string arguments, string workingDirectory, out string error, out string output)
        {
            error = "";
            output = "";

            System.Diagnostics.ProcessStartInfo startInfo = new System.Diagnostics.ProcessStartInfo();
            startInfo.CreateNoWindow = true;
            startInfo.UseShellExecute = false;
            startInfo.ErrorDialog = false;
            startInfo.RedirectStandardError = true;
            startInfo.RedirectStandardOutput = true;

            startInfo.FileName = filename;
            startInfo.Arguments = arguments;
            startInfo.WorkingDirectory = workingDirectory;

            try
            {
                System.Diagnostics.Process process = new System.Diagnostics.Process();
                //process.Exited += (sender, e) => { UnityEngine.Debug.LogError($"CreateProcess Exit {process.ExitCode}"); };
                //process.EnableRaisingEvents = true; // activate exit event
                process.StartInfo = startInfo;
                process.Start();
                error = process.StandardError.ReadToEnd();
                output = process.StandardOutput.ReadToEnd();
            }
            catch(System.Exception e)
            {
                error = e.ToString();
            }
        }
    }
#endif
}
