#version 300 es

precision highp float;
precision highp int;
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _SpecColor;
uniform 	mediump vec4 _Color;
uniform 	float _Glossiness;
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _BumpMap;
uniform highp sampler2D unity_NHxRoughness;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD2;
in highp vec4 vs_TEXCOORD3;
in highp vec4 vs_TEXCOORD4;
layout(location = 0) out mediump vec4 SV_Target0;
vec3 u_xlat0;
mediump vec3 u_xlat16_0;
mediump vec4 u_xlat16_1;
mediump vec3 u_xlat16_2;
vec3 u_xlat3;
float u_xlat4;
mediump float u_xlat16_13;
void main()
{
    u_xlat16_0.xyz = texture(_BumpMap, vs_TEXCOORD0.xy).xyz;
    u_xlat16_1.xyz = u_xlat16_0.xyz * vec3(2.0, 2.0, 2.0) + vec3(-1.0, -1.0, -1.0);
    u_xlat16_2.xyz = u_xlat16_1.yyy * vs_TEXCOORD3.xyz;
    u_xlat16_1.xyw = vs_TEXCOORD2.xyz * u_xlat16_1.xxx + u_xlat16_2.xyz;
    u_xlat16_1.xyz = vs_TEXCOORD4.xyz * u_xlat16_1.zzz + u_xlat16_1.xyw;
    u_xlat0.x = dot((-vs_TEXCOORD1.xyz), u_xlat16_1.xyz);
    u_xlat0.x = u_xlat0.x + u_xlat0.x;
    u_xlat0.xyz = u_xlat16_1.xyz * (-u_xlat0.xxx) + (-vs_TEXCOORD1.xyz);
    u_xlat3.x = vs_TEXCOORD2.w;
    u_xlat3.y = vs_TEXCOORD3.w;
    u_xlat3.z = vs_TEXCOORD4.w;
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat3.xyz);
    u_xlat4 = dot(u_xlat16_1.xyz, u_xlat3.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat4 = min(max(u_xlat4, 0.0), 1.0);
#else
    u_xlat4 = clamp(u_xlat4, 0.0, 1.0);
#endif
    u_xlat16_1.xyz = vec3(u_xlat4) * _LightColor0.xyz;
    u_xlat0.x = u_xlat0.x * u_xlat0.x;
    u_xlat0.x = u_xlat0.x * u_xlat0.x;
    u_xlat0.y = (-_Glossiness) + 1.0;
    u_xlat0.x = texture(unity_NHxRoughness, u_xlat0.xy).x;
    u_xlat0.x = u_xlat0.x * 16.0;
    u_xlat16_2.xyz = u_xlat0.xxx * _SpecColor.xyz;
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_0.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_13 = (-_SpecColor.x) + 1.0;
    u_xlat16_2.xyz = u_xlat16_0.xyz * vec3(u_xlat16_13) + u_xlat16_2.xyz;
    SV_Target0.xyz = u_xlat16_1.xyz * u_xlat16_2.xyz;
    SV_Target0.w = 1.0;
    return;
}

