Shader "ShadingMode/QuadOverdraw Clear"
{
    Properties
    {
        _MainTex("Texture", 2D) = "white" {} }

        SubShader
    {
        Tags { "RenderType" = "Opaque" }
        //LOD 100
        Cull Off
        Blend One Zero
        ZWrite Off
        ZTest Always
        ZClip  false

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 5.0 // support interlocked operation

            #include "UnityCG.cginc"

            // note: no SV_POSITION in this struct
            struct v2f {
                float2 placeholder : TEXCOORD0;
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;

            v2f vert(float4 vertex : POSITION, /*vertex position input*/
                out float4 outpos : SV_POSITION /*clip space position output*/)
            {
                v2f o;
                o.placeholder = float2(0, 0);

                outpos = UnityObjectToClipPos(vertex);
                return o;
            }

            // The temporary buffer used to synchronize and exchange data between quad sub-pixels.
            // Left half hold QuadDescriptor, right half hold QuadComplexity
            // Both are halfres here.
            RWTexture2D<uint> RWQuadBuffer : register(u1);

            uint2 QuadComplexityOffset()
            {
                uint QuadBufferWidth, QuadBufferHeight;
                RWQuadBuffer.GetDimensions(QuadBufferWidth, QuadBufferHeight);
                return uint2(QuadBufferWidth / 2, 0);
            }

            fixed4 frag(v2f i, UNITY_VPOS_TYPE SvPosition : VPOS) : SV_Target
            {
                uint2 QuadID = SvPosition.xy / 2;

                //float x = SvPosition.x / _ScreenParams.x;
                //float y = SvPosition.y / _ScreenParams.y;
                //return float4(y, y, y, 1);

                RWQuadBuffer[QuadID.xy] = 0;
                RWQuadBuffer[QuadID.xy + QuadComplexityOffset()] = 0;                

                return float4(0, 0, 0, 1);
            }
            ENDCG
        }
    }
}
