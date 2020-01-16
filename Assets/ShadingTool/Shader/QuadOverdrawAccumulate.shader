Shader "ShadingMode/QuadOverdraw Accumulate"
{
    Properties
    {
        _NormalizedComplexity("NormalizedComplexity", Vector) = (0, 0, 0, 1)
    }

        SubShader
    {
        Tags { "RenderType" = "Opaque" }
        //LOD 100
        Cull Back
        Blend One One
        ZWrite Off
        //ZTest Always

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 5.0 // support interlocked operation

            #include "UnityCG.cginc"
            #include "QuadOverdrawAccumulate.cginc"

            // note: no SV_POSITION in this struct
            struct v2f {
                float2 placeholder : TEXCOORD0;
            };

            float4 _NormalizedComplexity;
            int _NumIteration;

            v2f vert(float4 vertex : POSITION, /*vertex position input*/
                out float4 outpos : SV_POSITION /*clip space position output*/)
            {
                v2f o;
                o.placeholder = float2(0, 0);

                outpos = UnityObjectToClipPos(vertex);
                return o;
            }

            [earlydepthstencil]
            fixed4 frag(v2f i, UNITY_VPOS_TYPE SvPosition : VPOS, uint SvPrimitiveID : SvPrimitiveID) : SV_Target
            {
                //return float4(0, 0, 0, 1);
                float complexity = ComputeQuadCoverage(SvPosition, SvPrimitiveID, 64, true, true, 1);
                return float4(complexity, complexity, complexity, 1);
            }

            ENDCG
        }
    }
}
