#version 300 es

precision highp float;
precision highp int;
uniform 	vec4 _LightPositionRange;
uniform 	vec4 _LightProjectionParams;
uniform 	mediump vec4 _LightShadowData;
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _Color;
uniform 	mediump float _Metallic;
uniform 	float _Glossiness;
uniform 	vec4 hlslcc_mtx4x4unity_WorldToLight[4];
uniform mediump sampler2D _MainTex;
uniform highp sampler2D _LightTextureB0;
uniform highp samplerCube _LightTexture0;
uniform highp sampler2D unity_NHxRoughness;
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
mediump float u_xlat16_0;
mediump vec3 u_xlat16_1;
vec3 u_xlat2;
mediump vec3 u_xlat16_3;
float u_xlat4;
mediump vec3 u_xlat16_4;
float u_xlat12;
mediump float u_xlat16_13;
void main()
{
    u_xlat0.xyz = vs_TEXCOORD5.xyz + (-_LightPositionRange.xyz);
    u_xlat12 = max(abs(u_xlat0.y), abs(u_xlat0.x));
    u_xlat12 = max(abs(u_xlat0.z), u_xlat12);
    u_xlat12 = u_xlat12 + (-_LightProjectionParams.z);
    u_xlat12 = max(u_xlat12, 9.99999975e-06);
    u_xlat12 = u_xlat12 * _LightProjectionParams.w;
    u_xlat12 = _LightProjectionParams.y / u_xlat12;
    u_xlat12 = u_xlat12 + (-_LightProjectionParams.x);
    vec4 txVec0 = vec4(u_xlat0.xyz,u_xlat12);
    u_xlat16_0 = texture(hlslcc_zcmp_ShadowMapTexture, txVec0);
    u_xlat16_1.x = (-_LightShadowData.x) + 1.0;
    u_xlat16_1.x = u_xlat16_0 * u_xlat16_1.x + _LightShadowData.x;
    u_xlat0.xyz = vs_TEXCOORD5.yyy * hlslcc_mtx4x4unity_WorldToLight[1].xyz;
    u_xlat0.xyz = hlslcc_mtx4x4unity_WorldToLight[0].xyz * vs_TEXCOORD5.xxx + u_xlat0.xyz;
    u_xlat0.xyz = hlslcc_mtx4x4unity_WorldToLight[2].xyz * vs_TEXCOORD5.zzz + u_xlat0.xyz;
    u_xlat0.xyz = u_xlat0.xyz + hlslcc_mtx4x4unity_WorldToLight[3].xyz;
    u_xlat12 = dot(u_xlat0.xyz, u_xlat0.xyz);
    u_xlat0.x = texture(_LightTexture0, u_xlat0.xyz).w;
    u_xlat4 = texture(_LightTextureB0, vec2(u_xlat12)).x;
    u_xlat0.x = u_xlat0.x * u_xlat4;
    u_xlat0.x = u_xlat16_1.x * u_xlat0.x;
    u_xlat16_1.xyz = u_xlat0.xxx * _LightColor0.xyz;
    u_xlat0.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat0.x = inversesqrt(u_xlat0.x);
    u_xlat0.xyz = u_xlat0.xxx * vs_TEXCOORD4.xyz;
    u_xlat2.x = vs_TEXCOORD2.w;
    u_xlat2.y = vs_TEXCOORD3.w;
    u_xlat2.z = vs_TEXCOORD4.w;
    u_xlat12 = dot(u_xlat0.xyz, u_xlat2.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat12 = min(max(u_xlat12, 0.0), 1.0);
#else
    u_xlat12 = clamp(u_xlat12, 0.0, 1.0);
#endif
    u_xlat16_1.xyz = vec3(u_xlat12) * u_xlat16_1.xyz;
    u_xlat12 = dot((-vs_TEXCOORD1.xyz), u_xlat0.xyz);
    u_xlat12 = u_xlat12 + u_xlat12;
    u_xlat0.xyz = u_xlat0.xyz * (-vec3(u_xlat12)) + (-vs_TEXCOORD1.xyz);
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat2.xyz);
    u_xlat0.x = u_xlat0.x * u_xlat0.x;
    u_xlat0.x = u_xlat0.x * u_xlat0.x;
    u_xlat0.y = (-_Glossiness) + 1.0;
    u_xlat0.x = texture(unity_NHxRoughness, u_xlat0.xy).x;
    u_xlat0.x = u_xlat0.x * 16.0;
    u_xlat16_4.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_3.xyz = _Color.xyz * u_xlat16_4.xyz + vec3(-0.220916301, -0.220916301, -0.220916301);
    u_xlat16_4.xyz = u_xlat16_4.xyz * _Color.xyz;
    u_xlat16_3.xyz = vec3(vec3(_Metallic, _Metallic, _Metallic)) * u_xlat16_3.xyz + vec3(0.220916301, 0.220916301, 0.220916301);
    u_xlat16_3.xyz = u_xlat0.xxx * u_xlat16_3.xyz;
    u_xlat16_13 = (-_Metallic) * 0.779083729 + 0.779083729;
    u_xlat16_3.xyz = u_xlat16_4.xyz * vec3(u_xlat16_13) + u_xlat16_3.xyz;
    SV_Target0.xyz = u_xlat16_1.xyz * u_xlat16_3.xyz;
    SV_Target0.w = 1.0;
    return;
}

