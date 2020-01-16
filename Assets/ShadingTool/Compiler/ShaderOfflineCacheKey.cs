namespace FA.ShadingTool 
{
#if UNITY_EDITOR

    internal class ShaderOfflineCacheKey
    {
        private string m_platform;
        private string m_core;
        private string m_formattedShadername;

        private string _hashstring;
        private string hashstring {
            get {
                if (string.IsNullOrEmpty(_hashstring))
                    _hashstring = $"{m_platform}_{m_core}_{m_formattedShadername}";

                return _hashstring;
            }
        }

        public string folderpath;
        public string formattedShadername { get { return m_formattedShadername; } private set { m_formattedShadername = value; } }

        public ShaderOfflineCacheKey(string formattedShadername)
        {
            m_platform = Preferences.shaderPlatform;
            m_core = Preferences.maliCore;
            m_formattedShadername = formattedShadername;

            _hashstring = "";
            folderpath = "";
        }

        public ShaderOfflineCacheKey(string platform, string core, string formattedShadername)
        {
            this.m_platform = platform;
            this.m_core = core;
            this.m_formattedShadername = formattedShadername;

            _hashstring = "";
            folderpath = "";
        }

        public override bool Equals(object obj)
        {
            ShaderOfflineCacheKey key = (ShaderOfflineCacheKey)obj;
            return key.m_platform == this.m_platform && key.m_core == this.m_core && key.m_formattedShadername == this.m_formattedShadername;
        }

        public override int GetHashCode()
        {
            //int hashcodePlatform = platform.GetHashCode();
            //int hashcodeCore = core.GetHashCode();
            //int hashcode = filename.GetHashCode();

            //return hashcodePlatform + hashcodeCore + hashcode;

            return hashstring.GetHashCode();
        }

        public static ShaderOfflineCacheKey GetKey(string shadername)
        {
            return new ShaderOfflineCacheKey(shadername);
        }

        public static string FormateShaderName(string shadername)
        {
            string[] array = shadername.Split(new string[] { "/" }, System.StringSplitOptions.RemoveEmptyEntries);
            string formattedShadername = "";
            foreach (string str in array)
                formattedShadername = $"{formattedShadername}-{str}";

            return formattedShadername;
        }
    }
#endif
}
