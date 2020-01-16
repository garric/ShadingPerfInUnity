#version 300 es

precision highp float;
precision highp int;
uniform 	vec3 _WorldSpaceCameraPos;
uniform 	vec4 _LightPositionRange;
uniform 	vec4 _LightProjectionParams;
uniform 	mediump vec4 _LightShadowData;
uniform 	vec4 unity_ShadowFadeCenterAndType;
uniform 	vec4 hlslcc_mtx4x4unity_MatrixV[4];
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _SpecColor;
uniform 	mediump vec4 _Color;
uniform 	mediump float _BumpScale;
uniform 	float _Glossiness;
uniform 	vec4 hlslcc_mtx4x4unity_WorldToLight[4];
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _BumpMap;
uniform highp sampler2D _LightTexture0;
uniform mediump samplerCubeShadow hlslcc_zcmp_ShadowMapTexture;
uniform mediump samplerCube _ShadowMapTexture;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD2;
in highp vec4 vs_TEXCOORD3;
in highp vec4 vs_TEXCOORD4;
in highp vec3 vs_TEXCOORD5;
layout(location = 0) out mediump vec4 SV_Target0;
vec3 u_xlat0;
mediump vec3 u_xlat16_0;
vec3 u_xlat1;
bool u_xlatb1;
vec4 u_xlat2;
mediump vec3 u_xlat16_3;
mediump vec4 u_xlat16_4;
mediump vec3 u_xlat16_5;
vec3 u_xlat6;
vec3 u_xlat7;
vec3 u_xlat8;
mediump float u_xlat16_10;
mediump vec3 u_xlat16_11;
float u_xlat14;
float u_xlat15;
mediump float u_xlat16_18;
float u_xlat21;
float u_xlat22;
mediump float u_xlat16_24;
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
    u_xlat7.xyz = vs_TEXCOORD5.xyz + (-_LightPositionRange.xyz);
    u_xlat1.x = max(abs(u_xlat7.y), abs(u_xlat7.x));
    u_xlat1.x = max(abs(u_xlat7.z), u_xlat1.x);
    u_xlat1.x = u_xlat1.x + (-_LightProjectionParams.z);
    u_xlat1.x = max(u_xlat1.x, 9.99999975e-06);
    u_xlat1.x = u_xlat1.x * _LightProjectionParams.w;
    u_xlat1.x = _LightProjectionParams.y / u_xlat1.x;
    u_xlat1.x = u_xlat1.x + (-_LightProjectionParams.x);
    u_xlat8.xyz = u_xlat7.xyz + vec3(0.0078125, 0.0078125, 0.0078125);
    vec4 txVec0 = vec4(u_xlat8.xyz,u_xlat1.x);
    u_xlat2.x = texture(hlslcc_zcmp_ShadowMapTexture, txVec0);
    u_xlat8.xyz = u_xlat7.xyz + vec3(-0.0078125, -0.0078125, 0.0078125);
    vec4 txVec1 = vec4(u_xlat8.xyz,u_xlat1.x);
    u_xlat2.y = texture(hlslcc_zcmp_ShadowMapTexture, txVec1);
    u_xlat8.xyz = u_xlat7.xyz + vec3(-0.0078125, 0.0078125, -0.0078125);
    u_xlat7.xyz = u_xlat7.xyz + vec3(0.0078125, -0.0078125, -0.0078125);
    vec4 txVec2 = vec4(u_xlat7.xyz,u_xlat1.x);
    u_xlat2.w = texture(hlslcc_zcmp_ShadowMapTexture, txVec2);
    vec4 txVec3 = vec4(u_xlat8.xyz,u_xlat1.x);
    u_xlat2.z = texture(hlslcc_zcmp_ShadowMapTexture, txVec3);
    u_xlat7.x = dot(u_xlat2, vec4(0.25, 0.25, 0.25, 0.25));
    u_xlat16_3.x = (-_LightShadowData.x) + 1.0;
    u_xlat16_3.x = u_xlat7.x * u_xlat16_3.x + _LightShadowData.x;
    u_xlat16_10 = (-u_xlat16_3.x) + 1.0;
    u_xlat16_3.x = u_xlat0.x * u_xlat16_10 + u_xlat16_3.x;
    u_xlat0.xyz = vs_TEXCOORD5.yyy * hlslcc_mtx4x4unity_WorldToLight[1].xyz;
    u_xlat0.xyz = hlslcc_mtx4x4unity_WorldToLight[0].xyz * vs_TEXCOORD5.xxx + u_xlat0.xyz;
    u_xlat0.xyz = hlslcc_mtx4x4unity_WorldToLight[2].xyz * vs_TEXCOORD5.zzz + u_xlat0.xyz;
    u_xlat0.xyz = u_xlat0.xyz + hlslcc_mtx4x4unity_WorldToLight[3].xyz;
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat0.xyz);
    u_xlat0.x = texture(_LightTexture0, u_xlat0.xx).x;
    u_xlat0.x = u_xlat16_3.x * u_xlat0.x;
    u_xlat16_3.xyz = u_xlat0.xxx * _LightColor0.xyz;
    u_xlat16_0.xyz = texture(_BumpMap, vs_TEXCOORD0.xy).xyz;
    u_xlat16_4.xyz = u_xlat16_0.xyz * vec3(2.0, 2.0, 2.0) + vec3(-1.0, -1.0, -1.0);
    u_xlat16_4.xy = u_xlat16_4.xy * vec2(_BumpScale);
    u_xlat16_5.xyz = u_xlat16_4.yyy * vs_TEXCOORD3.xyz;
    u_xlat16_4.xyw = vs_TEXCOORD2.xyz * u_xlat16_4.xxx + u_xlat16_5.xyz;
    u_xlat16_4.xyz = vs_TEXCOORD4.xyz * u_xlat16_4.zzz + u_xlat16_4.xyw;
    u_xlat16_0.x = dot(u_xlat16_4.xyz, u_xlat16_4.xyz);
    u_xlat16_0.x = inversesqrt(u_xlat16_0.x);
    u_xlat16_0.xyz = u_xlat16_0.xxx * u_xlat16_4.xyz;
    u_xlat21 = dot(vs_TEXCOORD1.xyz, vs_TEXCOORD1.xyz);
    u_xlat21 = inversesqrt(u_xlat21);
    u_xlat1.xyz = vec3(u_xlat21) * vs_TEXCOORD1.xyz;
    u_xlat2.x = vs_TEXCOORD2.w;
    u_xlat2.y = vs_TEXCOORD3.w;
    u_xlat2.z = vs_TEXCOORD4.w;
    u_xlat21 = dot(u_xlat2.xyz, u_xlat2.xyz);
    u_xlat21 = inversesqrt(u_xlat21);
    u_xlat6.xyz = u_xlat2.xyz * vec3(u_xlat21) + (-u_xlat1.xyz);
    u_xlat1.x = dot(u_xlat16_0.xyz, (-u_xlat1.xyz));
    u_xlat8.xyz = vec3(u_xlat21) * u_xlat2.xyz;
    u_xlat21 = dot(u_xlat6.xyz, u_xlat6.xyz);
    u_xlat21 = max(u_xlat21, 0.00100000005);
    u_xlat21 = inversesqrt(u_xlat21);
    u_xlat2.xyz = vec3(u_xlat21) * u_xlat6.xyz;
    u_xlat21 = dot(u_xlat16_0.xyz, u_xlat2.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat21 = min(max(u_xlat21, 0.0), 1.0);
#else
    u_xlat21 = clamp(u_xlat21, 0.0, 1.0);
#endif
    u_xlat0.x = dot(u_xlat16_0.xyz, u_xlat8.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat7.x = dot(u_xlat8.xyz, u_xlat2.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat7.x = min(max(u_xlat7.x, 0.0), 1.0);
#else
    u_xlat7.x = clamp(u_xlat7.x, 0.0, 1.0);
#endif
    u_xlat14 = (-_Glossiness) + 1.0;
    u_xlat8.x = u_xlat14 * u_xlat14;
    u_xlat8.x = max(u_xlat8.x, 0.00200000009);
    u_xlat15 = u_xlat8.x * u_xlat8.x;
    u_xlat22 = u_xlat21 * u_xlat15 + (-u_xlat21);
    u_xlat21 = u_xlat22 * u_xlat21 + 1.0;
    u_xlat21 = u_xlat21 * u_xlat21 + 1.00000001e-07;
    u_xlat15 = u_xlat15 * 0.318309873;
    u_xlat21 = u_xlat15 / u_xlat21;
    u_xlat15 = (-u_xlat8.x) + 1.0;
    u_xlat22 = abs(u_xlat1.x) * u_xlat15 + u_xlat8.x;
    u_xlat8.x = u_xlat0.x * u_xlat15 + u_xlat8.x;
    u_xlat8.x = u_xlat8.x * abs(u_xlat1.x);
    u_xlat16_24 = -abs(u_xlat1.x) + 1.0;
    u_xlat1.x = u_xlat0.x * u_xlat22 + u_xlat8.x;
    u_xlat1.x = u_xlat1.x + 9.99999975e-06;
    u_xlat1.x = 0.5 / u_xlat1.x;
    u_xlat21 = u_xlat21 * u_xlat1.x;
    u_xlat21 = u_xlat21 * 3.14159274;
    u_xlat21 = max(u_xlat21, 9.99999975e-05);
    u_xlat21 = sqrt(u_xlat21);
    u_xlat21 = u_xlat0.x * u_xlat21;
    u_xlat16_4.x = dot(_SpecColor.xyz, _SpecColor.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlatb1 = !!(u_xlat16_4.x!=0.0);
#else
    u_xlatb1 = u_xlat16_4.x!=0.0;
#endif
    u_xlat1.x = u_xlatb1 ? 1.0 : float(0.0);
    u_xlat21 = u_xlat21 * u_xlat1.x;
    u_xlat1.xyz = u_xlat16_3.xyz * vec3(u_xlat21);
    u_xlat16_4.x = (-u_xlat7.x) + 1.0;
    u_xlat16_11.x = u_xlat16_4.x * u_xlat16_4.x;
    u_xlat16_11.x = u_xlat16_11.x * u_xlat16_11.x;
    u_xlat16_4.x = u_xlat16_4.x * u_xlat16_11.x;
    u_xlat16_11.xyz = (-_SpecColor.xyz) + vec3(1.0, 1.0, 1.0);
    u_xlat16_4.xyz = u_xlat16_11.xyz * u_xlat16_4.xxx + _SpecColor.xyz;
    u_xlat1.xyz = u_xlat1.xyz * u_xlat16_4.xyz;
    u_xlat16_4.x = u_xlat16_24 * u_xlat16_24;
    u_xlat16_4.x = u_xlat16_4.x * u_xlat16_4.x;
    u_xlat16_24 = u_xlat16_24 * u_xlat16_4.x;
    u_xlat16_4.x = u_xlat7.x + u_xlat7.x;
    u_xlat16_4.x = u_xlat7.x * u_xlat16_4.x;
    u_xlat16_4.x = u_xlat16_4.x * u_xlat14 + -0.5;
    u_xlat16_24 = u_xlat16_4.x * u_xlat16_24 + 1.0;
    u_xlat16_11.x = (-u_xlat0.x) + 1.0;
    u_xlat16_18 = u_xlat16_11.x * u_xlat16_11.x;
    u_xlat16_18 = u_xlat16_18 * u_xlat16_18;
    u_xlat16_11.x = u_xlat16_11.x * u_xlat16_18;
    u_xlat16_4.x = u_xlat16_4.x * u_xlat16_11.x + 1.0;
    u_xlat16_24 = u_xlat16_24 * u_xlat16_4.x;
    u_xlat0.x = u_xlat0.x * u_xlat16_24;
    u_xlat16_3.xyz = u_xlat0.xxx * u_xlat16_3.xyz;
    u_xlat16_24 = max(_SpecColor.y, _SpecColor.x);
    u_xlat16_24 = max(u_xlat16_24, _SpecColor.z);
    u_xlat16_24 = (-u_xlat16_24) + 1.0;
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_0.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_4.xyz = vec3(u_xlat16_24) * u_xlat16_0.xyz;
    u_xlat0.xyz = u_xlat16_4.xyz * u_xlat16_3.xyz + u_xlat1.xyz;
    SV_Target0.xyz = u_xlat0.xyz;
    SV_Target0.w = 1.0;
    return;
}

