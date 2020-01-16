#version 300 es
#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
#endif

precision highp float;
precision highp int;
uniform 	vec3 _WorldSpaceCameraPos;
uniform 	vec4 hlslcc_mtx4x4unity_WorldToShadow[16];
uniform 	mediump vec4 _LightShadowData;
uniform 	vec4 unity_ShadowFadeCenterAndType;
uniform 	vec4 hlslcc_mtx4x4unity_MatrixV[4];
uniform 	mediump vec4 _LightColor0;
uniform 	vec4 _ShadowOffsets[4];
uniform 	mediump vec4 _Color;
uniform 	mediump float _Metallic;
uniform 	float _Glossiness;
uniform 	vec4 hlslcc_mtx4x4unity_WorldToLight[4];
uniform mediump sampler2D _MainTex;
uniform highp sampler2D _LightTexture0;
uniform highp sampler2D _LightTextureB0;
uniform mediump sampler2DShadow hlslcc_zcmp_ShadowMapTexture;
uniform mediump sampler2D _ShadowMapTexture;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD2;
in highp vec4 vs_TEXCOORD3;
in highp vec4 vs_TEXCOORD4;
in highp vec3 vs_TEXCOORD5;
layout(location = 0) out mediump vec4 SV_Target0;
vec4 u_xlat0;
vec4 u_xlat1;
bool u_xlatb1;
vec3 u_xlat2;
mediump vec3 u_xlat16_2;
mediump vec3 u_xlat16_3;
vec3 u_xlat4;
mediump vec3 u_xlat16_5;
mediump vec3 u_xlat16_6;
vec3 u_xlat7;
float u_xlat8;
mediump float u_xlat16_10;
mediump float u_xlat16_12;
float u_xlat14;
mediump float u_xlat16_14;
bool u_xlatb14;
float u_xlat15;
mediump float u_xlat16_19;
float u_xlat21;
float u_xlat22;
mediump float u_xlat16_24;
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
    u_xlat1 = vs_TEXCOORD5.yyyy * hlslcc_mtx4x4unity_WorldToShadow[1];
    u_xlat1 = hlslcc_mtx4x4unity_WorldToShadow[0] * vs_TEXCOORD5.xxxx + u_xlat1;
    u_xlat1 = hlslcc_mtx4x4unity_WorldToShadow[2] * vs_TEXCOORD5.zzzz + u_xlat1;
    u_xlat1 = u_xlat1 + hlslcc_mtx4x4unity_WorldToShadow[3];
    u_xlat7.xyz = u_xlat1.xyz / u_xlat1.www;
    u_xlat1.xyz = u_xlat7.xyz + _ShadowOffsets[0].xyz;
    vec3 txVec0 = vec3(u_xlat1.xy,u_xlat1.z);
    u_xlat1.x = textureLod(hlslcc_zcmp_ShadowMapTexture, txVec0, 0.0);
    u_xlat2.xyz = u_xlat7.xyz + _ShadowOffsets[1].xyz;
    vec3 txVec1 = vec3(u_xlat2.xy,u_xlat2.z);
    u_xlat1.y = textureLod(hlslcc_zcmp_ShadowMapTexture, txVec1, 0.0);
    u_xlat2.xyz = u_xlat7.xyz + _ShadowOffsets[2].xyz;
    u_xlat7.xyz = u_xlat7.xyz + _ShadowOffsets[3].xyz;
    vec3 txVec2 = vec3(u_xlat7.xy,u_xlat7.z);
    u_xlat1.w = textureLod(hlslcc_zcmp_ShadowMapTexture, txVec2, 0.0);
    vec3 txVec3 = vec3(u_xlat2.xy,u_xlat2.z);
    u_xlat1.z = textureLod(hlslcc_zcmp_ShadowMapTexture, txVec3, 0.0);
    u_xlat7.x = dot(u_xlat1, vec4(0.25, 0.25, 0.25, 0.25));
    u_xlat16_14 = (-_LightShadowData.x) + 1.0;
    u_xlat7.x = u_xlat7.x * u_xlat16_14 + _LightShadowData.x;
    u_xlat16_3.x = (-u_xlat7.x) + 1.0;
    u_xlat16_3.x = u_xlat0.x * u_xlat16_3.x + u_xlat7.x;
    u_xlat0 = vs_TEXCOORD5.yyyy * hlslcc_mtx4x4unity_WorldToLight[1];
    u_xlat0 = hlslcc_mtx4x4unity_WorldToLight[0] * vs_TEXCOORD5.xxxx + u_xlat0;
    u_xlat0 = hlslcc_mtx4x4unity_WorldToLight[2] * vs_TEXCOORD5.zzzz + u_xlat0;
    u_xlat0 = u_xlat0 + hlslcc_mtx4x4unity_WorldToLight[3];
    u_xlat1.xy = u_xlat0.xy / u_xlat0.ww;
    u_xlat1.xy = u_xlat1.xy + vec2(0.5, 0.5);
    u_xlat21 = texture(_LightTexture0, u_xlat1.xy).w;
#ifdef UNITY_ADRENO_ES3
    u_xlatb1 = !!(0.0<u_xlat0.z);
#else
    u_xlatb1 = 0.0<u_xlat0.z;
#endif
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat0.xyz);
    u_xlat0.x = texture(_LightTextureB0, u_xlat0.xx).x;
    u_xlat16_10 = (u_xlatb1) ? 1.0 : 0.0;
    u_xlat16_10 = u_xlat21 * u_xlat16_10;
    u_xlat16_10 = u_xlat0.x * u_xlat16_10;
    u_xlat16_3.x = u_xlat16_3.x * u_xlat16_10;
    u_xlat16_3.xyz = u_xlat16_3.xxx * _LightColor0.xyz;
    u_xlat0.x = dot(vs_TEXCOORD1.xyz, vs_TEXCOORD1.xyz);
    u_xlat0.x = inversesqrt(u_xlat0.x);
    u_xlat0.xyz = u_xlat0.xxx * vs_TEXCOORD1.xyz;
    u_xlat1.x = vs_TEXCOORD2.w;
    u_xlat1.y = vs_TEXCOORD3.w;
    u_xlat1.z = vs_TEXCOORD4.w;
    u_xlat21 = dot(u_xlat1.xyz, u_xlat1.xyz);
    u_xlat21 = inversesqrt(u_xlat21);
    u_xlat2.xyz = u_xlat1.xyz * vec3(u_xlat21) + (-u_xlat0.xyz);
    u_xlat1.xyz = vec3(u_xlat21) * u_xlat1.xyz;
    u_xlat21 = dot(u_xlat2.xyz, u_xlat2.xyz);
    u_xlat21 = max(u_xlat21, 0.00100000005);
    u_xlat21 = inversesqrt(u_xlat21);
    u_xlat2.xyz = vec3(u_xlat21) * u_xlat2.xyz;
    u_xlat21 = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat21 = inversesqrt(u_xlat21);
    u_xlat4.xyz = vec3(u_xlat21) * vs_TEXCOORD4.xyz;
    u_xlat21 = dot(u_xlat4.xyz, u_xlat2.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat21 = min(max(u_xlat21, 0.0), 1.0);
#else
    u_xlat21 = clamp(u_xlat21, 0.0, 1.0);
#endif
    u_xlat22 = dot(u_xlat1.xyz, u_xlat2.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat22 = min(max(u_xlat22, 0.0), 1.0);
#else
    u_xlat22 = clamp(u_xlat22, 0.0, 1.0);
#endif
    u_xlat1.x = dot(u_xlat4.xyz, u_xlat1.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat1.x = min(max(u_xlat1.x, 0.0), 1.0);
#else
    u_xlat1.x = clamp(u_xlat1.x, 0.0, 1.0);
#endif
    u_xlat0.x = dot(u_xlat4.xyz, (-u_xlat0.xyz));
    u_xlat7.x = (-_Glossiness) + 1.0;
    u_xlat14 = u_xlat7.x * u_xlat7.x;
    u_xlat14 = max(u_xlat14, 0.00200000009);
    u_xlat8 = u_xlat14 * u_xlat14;
    u_xlat15 = u_xlat21 * u_xlat8 + (-u_xlat21);
    u_xlat21 = u_xlat15 * u_xlat21 + 1.0;
    u_xlat21 = u_xlat21 * u_xlat21 + 1.00000001e-07;
    u_xlat8 = u_xlat8 * 0.318309873;
    u_xlat21 = u_xlat8 / u_xlat21;
    u_xlat8 = (-u_xlat14) + 1.0;
    u_xlat15 = abs(u_xlat0.x) * u_xlat8 + u_xlat14;
    u_xlat14 = u_xlat1.x * u_xlat8 + u_xlat14;
    u_xlat14 = u_xlat14 * abs(u_xlat0.x);
    u_xlat16_24 = -abs(u_xlat0.x) + 1.0;
    u_xlat0.x = u_xlat1.x * u_xlat15 + u_xlat14;
    u_xlat0.x = u_xlat0.x + 9.99999975e-06;
    u_xlat0.x = 0.5 / u_xlat0.x;
    u_xlat0.x = u_xlat21 * u_xlat0.x;
    u_xlat0.x = u_xlat0.x * 3.14159274;
    u_xlat0.x = max(u_xlat0.x, 9.99999975e-05);
    u_xlat0.x = sqrt(u_xlat0.x);
    u_xlat0.x = u_xlat1.x * u_xlat0.x;
    u_xlat16_2.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_5.xyz = _Color.xyz * u_xlat16_2.xyz + vec3(-0.220916301, -0.220916301, -0.220916301);
    u_xlat16_2.xyz = u_xlat16_2.xyz * _Color.xyz;
    u_xlat16_5.xyz = vec3(vec3(_Metallic, _Metallic, _Metallic)) * u_xlat16_5.xyz + vec3(0.220916301, 0.220916301, 0.220916301);
    u_xlat16_26 = dot(u_xlat16_5.xyz, u_xlat16_5.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlatb14 = !!(u_xlat16_26!=0.0);
#else
    u_xlatb14 = u_xlat16_26!=0.0;
#endif
    u_xlat14 = u_xlatb14 ? 1.0 : float(0.0);
    u_xlat0.x = u_xlat14 * u_xlat0.x;
    u_xlat0.xzw = u_xlat16_3.xyz * u_xlat0.xxx;
    u_xlat16_26 = (-u_xlat22) + 1.0;
    u_xlat16_6.x = u_xlat16_26 * u_xlat16_26;
    u_xlat16_6.x = u_xlat16_6.x * u_xlat16_6.x;
    u_xlat16_26 = u_xlat16_26 * u_xlat16_6.x;
    u_xlat16_6.xyz = (-u_xlat16_5.xyz) + vec3(1.0, 1.0, 1.0);
    u_xlat16_5.xyz = u_xlat16_6.xyz * vec3(u_xlat16_26) + u_xlat16_5.xyz;
    u_xlat0.xzw = u_xlat0.xzw * u_xlat16_5.xyz;
    u_xlat16_5.x = u_xlat16_24 * u_xlat16_24;
    u_xlat16_5.x = u_xlat16_5.x * u_xlat16_5.x;
    u_xlat16_24 = u_xlat16_24 * u_xlat16_5.x;
    u_xlat16_5.x = u_xlat22 + u_xlat22;
    u_xlat16_5.x = u_xlat22 * u_xlat16_5.x;
    u_xlat16_5.x = u_xlat16_5.x * u_xlat7.x + -0.5;
    u_xlat16_24 = u_xlat16_5.x * u_xlat16_24 + 1.0;
    u_xlat16_12 = (-u_xlat1.x) + 1.0;
    u_xlat16_19 = u_xlat16_12 * u_xlat16_12;
    u_xlat16_19 = u_xlat16_19 * u_xlat16_19;
    u_xlat16_12 = u_xlat16_12 * u_xlat16_19;
    u_xlat16_5.x = u_xlat16_5.x * u_xlat16_12 + 1.0;
    u_xlat16_24 = u_xlat16_24 * u_xlat16_5.x;
    u_xlat7.x = u_xlat1.x * u_xlat16_24;
    u_xlat16_3.xyz = u_xlat7.xxx * u_xlat16_3.xyz;
    u_xlat16_24 = (-_Metallic) * 0.779083729 + 0.779083729;
    u_xlat16_5.xyz = u_xlat16_2.xyz * vec3(u_xlat16_24);
    u_xlat0.xyz = u_xlat16_5.xyz * u_xlat16_3.xyz + u_xlat0.xzw;
    SV_Target0.xyz = u_xlat0.xyz;
    SV_Target0.w = 1.0;
    return;
}

