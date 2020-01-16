#version 300 es

precision highp float;
precision highp int;
uniform 	vec3 _WorldSpaceCameraPos;
uniform 	mediump vec4 _LightShadowData;
uniform 	vec4 unity_ShadowFadeCenterAndType;
uniform 	vec4 hlslcc_mtx4x4unity_MatrixV[4];
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _Color;
uniform 	mediump float _Metallic;
uniform 	float _Glossiness;
uniform 	vec4 hlslcc_mtx4x4unity_WorldToLight[4];
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _ShadowMapTexture;
uniform highp sampler2D _LightTexture0;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD2;
in highp vec4 vs_TEXCOORD3;
in highp vec4 vs_TEXCOORD4;
in highp vec3 vs_TEXCOORD5;
in highp vec4 vs_TEXCOORD7;
layout(location = 0) out mediump vec4 SV_Target0;
vec3 u_xlat0;
vec3 u_xlat1;
mediump vec3 u_xlat16_1;
mediump vec3 u_xlat16_2;
vec3 u_xlat3;
vec3 u_xlat4;
mediump vec3 u_xlat16_5;
mediump vec3 u_xlat16_6;
vec3 u_xlat7;
mediump float u_xlat16_7;
float u_xlat8;
mediump float u_xlat16_12;
float u_xlat14;
float u_xlat15;
mediump float u_xlat16_19;
float u_xlat21;
float u_xlat22;
bool u_xlatb22;
mediump float u_xlat16_23;
mediump float u_xlat16_26;
void main()
{
    u_xlat0.xyz = vs_TEXCOORD5.xyz + (-unity_ShadowFadeCenterAndType.xyz);
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat0.xyz);
    u_xlat0.x = sqrt(u_xlat0.x);
    u_xlat7.xyz = (-vs_TEXCOORD5.xyz) + _WorldSpaceCameraPos.xyz;
    u_xlat1.x = hlslcc_mtx4x4unity_MatrixV[0].z;
    u_xlat1.y = hlslcc_mtx4x4unity_MatrixV[1].z;
    u_xlat1.z = hlslcc_mtx4x4unity_MatrixV[2].z;
    u_xlat7.x = dot(u_xlat7.xyz, u_xlat1.xyz);
    u_xlat0.x = (-u_xlat7.x) + u_xlat0.x;
    u_xlat0.x = unity_ShadowFadeCenterAndType.w * u_xlat0.x + u_xlat7.x;
    u_xlat0.x = u_xlat0.x * _LightShadowData.z + _LightShadowData.w;
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat7.xy = vs_TEXCOORD7.xy / vs_TEXCOORD7.ww;
    u_xlat16_7 = texture(_ShadowMapTexture, u_xlat7.xy).x;
    u_xlat16_2.x = (-u_xlat16_7) + 1.0;
    u_xlat16_2.x = u_xlat0.x * u_xlat16_2.x + u_xlat16_7;
    u_xlat0.xy = vs_TEXCOORD5.yy * hlslcc_mtx4x4unity_WorldToLight[1].xy;
    u_xlat0.xy = hlslcc_mtx4x4unity_WorldToLight[0].xy * vs_TEXCOORD5.xx + u_xlat0.xy;
    u_xlat0.xy = hlslcc_mtx4x4unity_WorldToLight[2].xy * vs_TEXCOORD5.zz + u_xlat0.xy;
    u_xlat0.xy = u_xlat0.xy + hlslcc_mtx4x4unity_WorldToLight[3].xy;
    u_xlat0.x = texture(_LightTexture0, u_xlat0.xy).w;
    u_xlat0.x = u_xlat16_2.x * u_xlat0.x;
    u_xlat16_2.xyz = u_xlat0.xxx * _LightColor0.xyz;
    u_xlat0.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat0.x = inversesqrt(u_xlat0.x);
    u_xlat0.xyz = u_xlat0.xxx * vs_TEXCOORD4.xyz;
    u_xlat21 = dot(vs_TEXCOORD1.xyz, vs_TEXCOORD1.xyz);
    u_xlat21 = inversesqrt(u_xlat21);
    u_xlat1.x = vs_TEXCOORD2.w;
    u_xlat1.y = vs_TEXCOORD3.w;
    u_xlat1.z = vs_TEXCOORD4.w;
    u_xlat3.xyz = (-vs_TEXCOORD1.xyz) * vec3(u_xlat21) + u_xlat1.xyz;
    u_xlat4.xyz = vec3(u_xlat21) * vs_TEXCOORD1.xyz;
    u_xlat21 = dot(u_xlat0.xyz, (-u_xlat4.xyz));
    u_xlat22 = dot(u_xlat3.xyz, u_xlat3.xyz);
    u_xlat22 = max(u_xlat22, 0.00100000005);
    u_xlat22 = inversesqrt(u_xlat22);
    u_xlat3.xyz = vec3(u_xlat22) * u_xlat3.xyz;
    u_xlat22 = dot(u_xlat0.xyz, u_xlat3.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat22 = min(max(u_xlat22, 0.0), 1.0);
#else
    u_xlat22 = clamp(u_xlat22, 0.0, 1.0);
#endif
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat1.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat7.x = dot(u_xlat1.xyz, u_xlat3.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat7.x = min(max(u_xlat7.x, 0.0), 1.0);
#else
    u_xlat7.x = clamp(u_xlat7.x, 0.0, 1.0);
#endif
    u_xlat14 = (-_Glossiness) + 1.0;
    u_xlat1.x = u_xlat14 * u_xlat14;
    u_xlat1.x = max(u_xlat1.x, 0.00200000009);
    u_xlat8 = u_xlat1.x * u_xlat1.x;
    u_xlat15 = u_xlat22 * u_xlat8 + (-u_xlat22);
    u_xlat15 = u_xlat15 * u_xlat22 + 1.0;
    u_xlat15 = u_xlat15 * u_xlat15 + 1.00000001e-07;
    u_xlat8 = u_xlat8 * 0.318309873;
    u_xlat8 = u_xlat8 / u_xlat15;
    u_xlat15 = (-u_xlat1.x) + 1.0;
    u_xlat22 = abs(u_xlat21) * u_xlat15 + u_xlat1.x;
    u_xlat1.x = u_xlat0.x * u_xlat15 + u_xlat1.x;
    u_xlat1.x = abs(u_xlat21) * u_xlat1.x;
    u_xlat16_23 = -abs(u_xlat21) + 1.0;
    u_xlat21 = u_xlat0.x * u_xlat22 + u_xlat1.x;
    u_xlat21 = u_xlat21 + 9.99999975e-06;
    u_xlat21 = 0.5 / u_xlat21;
    u_xlat21 = u_xlat8 * u_xlat21;
    u_xlat21 = u_xlat21 * 3.14159274;
    u_xlat21 = max(u_xlat21, 9.99999975e-05);
    u_xlat21 = sqrt(u_xlat21);
    u_xlat21 = u_xlat0.x * u_xlat21;
    u_xlat16_1.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_5.xyz = _Color.xyz * u_xlat16_1.xyz + vec3(-0.220916301, -0.220916301, -0.220916301);
    u_xlat16_1.xyz = u_xlat16_1.xyz * _Color.xyz;
    u_xlat16_5.xyz = vec3(vec3(_Metallic, _Metallic, _Metallic)) * u_xlat16_5.xyz + vec3(0.220916301, 0.220916301, 0.220916301);
    u_xlat16_26 = dot(u_xlat16_5.xyz, u_xlat16_5.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlatb22 = !!(u_xlat16_26!=0.0);
#else
    u_xlatb22 = u_xlat16_26!=0.0;
#endif
    u_xlat22 = u_xlatb22 ? 1.0 : float(0.0);
    u_xlat21 = u_xlat21 * u_xlat22;
    u_xlat3.xyz = u_xlat16_2.xyz * vec3(u_xlat21);
    u_xlat16_26 = (-u_xlat7.x) + 1.0;
    u_xlat16_6.x = u_xlat16_26 * u_xlat16_26;
    u_xlat16_6.x = u_xlat16_6.x * u_xlat16_6.x;
    u_xlat16_26 = u_xlat16_26 * u_xlat16_6.x;
    u_xlat16_6.xyz = (-u_xlat16_5.xyz) + vec3(1.0, 1.0, 1.0);
    u_xlat16_5.xyz = u_xlat16_6.xyz * vec3(u_xlat16_26) + u_xlat16_5.xyz;
    u_xlat3.xyz = u_xlat3.xyz * u_xlat16_5.xyz;
    u_xlat16_5.x = u_xlat16_23 * u_xlat16_23;
    u_xlat16_5.x = u_xlat16_5.x * u_xlat16_5.x;
    u_xlat16_23 = u_xlat16_23 * u_xlat16_5.x;
    u_xlat16_5.x = u_xlat7.x + u_xlat7.x;
    u_xlat16_5.x = u_xlat7.x * u_xlat16_5.x;
    u_xlat16_5.x = u_xlat16_5.x * u_xlat14 + -0.5;
    u_xlat16_23 = u_xlat16_5.x * u_xlat16_23 + 1.0;
    u_xlat16_12 = (-u_xlat0.x) + 1.0;
    u_xlat16_19 = u_xlat16_12 * u_xlat16_12;
    u_xlat16_19 = u_xlat16_19 * u_xlat16_19;
    u_xlat16_12 = u_xlat16_12 * u_xlat16_19;
    u_xlat16_5.x = u_xlat16_5.x * u_xlat16_12 + 1.0;
    u_xlat16_23 = u_xlat16_23 * u_xlat16_5.x;
    u_xlat0.x = u_xlat0.x * u_xlat16_23;
    u_xlat16_2.xyz = u_xlat0.xxx * u_xlat16_2.xyz;
    u_xlat16_23 = (-_Metallic) * 0.779083729 + 0.779083729;
    u_xlat16_5.xyz = u_xlat16_1.xyz * vec3(u_xlat16_23);
    u_xlat0.xyz = u_xlat16_5.xyz * u_xlat16_2.xyz + u_xlat3.xyz;
    SV_Target0.xyz = u_xlat0.xyz;
    SV_Target0.w = 1.0;
    return;
}

