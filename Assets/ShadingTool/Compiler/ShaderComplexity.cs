namespace FA.ShadingTool 
{
#if UNITY_EDITOR
    using UnityEngine;
    using System.Collections.Generic;
    using System.IO;

    /// <summary>
    /// measured using Mali Offline Compiler 
    /// </summary>
    internal class ShaderComplexity
    {
        private string guid;
        private List<ShaderComplexityVariant> variants = new List<ShaderComplexityVariant>();

        public const string PREFIX_KEYWORD = "Keywords";

        public void Load(ShaderOfflineCacheKey key)
        {
            string[] folders = Directory.GetDirectories(key.folderpath);
            foreach (string folder in folders)
            {
                string formattedFolder = folder.FormatSlash();
                string folderName = new DirectoryInfo(formattedFolder).Name;
                if (folderName.IndexOf(PREFIX_KEYWORD) != 0)
                    continue;

                string[] keywords = folderName.Length > PREFIX_KEYWORD.Length ? folderName.Substring(PREFIX_KEYWORD.Length + 1).Split(new string[] { "-" }, System.StringSplitOptions.RemoveEmptyEntries) : new string[0];

                ShaderComplexityVariant variant = new ShaderComplexityVariant();
                if (variant.Load(formattedFolder, keywords))
                    variants.Add(variant);
            }
        }

        public void Clear()
        {
            variants.Clear();
        }

        public void Add(string folderPathComplexity, ShaderOfflineCache.ShaderVariantLines shaderVariantLines)
        {
            folderPathComplexity = $"{folderPathComplexity}/{PREFIX_KEYWORD}";
            foreach (string keyword in shaderVariantLines.keywords)
                folderPathComplexity = $"{folderPathComplexity}-{keyword}";
            if (!Directory.Exists(folderPathComplexity))
                Directory.CreateDirectory(folderPathComplexity);

            ShaderComplexityVariant variant = new ShaderComplexityVariant();
            if (variant.Save(folderPathComplexity, shaderVariantLines))
                variants.Add(variant);
        }

        public bool Contains(Material material)
        {
            int index = MatchKeywords(material.shaderKeywords);
            return index >= 0;
        }

        private int MatchKeywords(string[] keywords)
        {
            for (int i = 0; i < variants.Count; i++)
            {
                if (variants[i].MatchKeywords(keywords))
                    return i;
            }

            for (int i = 0; i < variants.Count; i++)
            {
                if (variants[i].NoKeywords)
                    return i;
            }

            return -1;
        }

        public ShaderComplexityVariant Find(Material material)
        {
            int index = MatchKeywords(material.shaderKeywords);
            return (index >= 0 ? variants[index] : ShaderComplexityVariant.Default);
        }
    }
#endif
}
