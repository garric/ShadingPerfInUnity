#version 300 es
#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
#endif

precision highp float;
precision highp int;
uniform 	mediump vec4 _WorldSpaceLightPos0;
uniform 	mediump vec4 unity_SpecCube0_HDR;
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _Color;
uniform 	mediump float _Metallic;
uniform 	float _Glossiness;
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _OcclusionMap;
uniform highp sampler2D unity_NHxRoughness;
uniform mediump samplerCube unity_SpecCube0;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD4;
in mediump vec4 vs_TEXCOORD5;
layout(location = 0) out mediump vec4 SV_Target0;
vec4 u_xlat0;
mediump float u_xlat16_0;
mediump vec4 u_xlat16_1;
vec3 u_xlat2;
mediump vec3 u_xlat16_2;
mediump vec3 u_xlat16_3;
mediump vec3 u_xlat16_4;
vec3 u_xlat5;
mediump vec3 u_xlat16_6;
mediump vec3 u_xlat16_7;
mediump vec3 u_xlat16_8;
mediump vec3 u_xlat16_9;
mediump float u_xlat16_10;
mediump vec3 u_xlat16_11;
float u_xlat20;
mediump float u_xlat16_33;
mediump float u_xlat16_34;
void main()
{
    u_xlat0.xw = (-vec2(_Glossiness)) + vec2(1.0, 1.0);
    u_xlat16_1.x = (-u_xlat0.x) * 0.699999988 + 1.70000005;
    u_xlat16_1.x = u_xlat0.x * u_xlat16_1.x;
    u_xlat16_1.x = u_xlat16_1.x * 6.0;
    u_xlat0.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat0.x = inversesqrt(u_xlat0.x);
    u_xlat2.xyz = u_xlat0.xxx * vs_TEXCOORD4.xyz;
    u_xlat16_11.x = dot(vs_TEXCOORD1.xyz, u_xlat2.xyz);
    u_xlat16_11.x = u_xlat16_11.x + u_xlat16_11.x;
    u_xlat16_11.xyz = u_xlat2.xyz * (-u_xlat16_11.xxx) + vs_TEXCOORD1.xyz;
    u_xlat16_1 = textureLod(unity_SpecCube0, u_xlat16_11.xyz, u_xlat16_1.x);
    u_xlat16_3.x = u_xlat16_1.w + -1.0;
    u_xlat16_3.x = unity_SpecCube0_HDR.w * u_xlat16_3.x + 1.0;
    u_xlat16_3.x = u_xlat16_3.x * unity_SpecCube0_HDR.x;
    u_xlat16_3.xyz = u_xlat16_1.xyz * u_xlat16_3.xxx;
    u_xlat16_0 = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_3.xyz = vec3(u_xlat16_0) * u_xlat16_3.xyz;
    u_xlat16_4.xyz = vec3(u_xlat16_0) * vs_TEXCOORD5.xyz;
    u_xlat0.x = dot((-vs_TEXCOORD1.xyz), u_xlat2.xyz);
    u_xlat20 = u_xlat0.x;
#ifdef UNITY_ADRENO_ES3
    u_xlat20 = min(max(u_xlat20, 0.0), 1.0);
#else
    u_xlat20 = clamp(u_xlat20, 0.0, 1.0);
#endif
    u_xlat0.x = u_xlat0.x + u_xlat0.x;
    u_xlat5.xyz = u_xlat2.xyz * (-u_xlat0.xxx) + (-vs_TEXCOORD1.xyz);
    u_xlat0.x = dot(u_xlat2.xyz, _WorldSpaceLightPos0.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat16_6.xyz = u_xlat0.xxx * _LightColor0.xyz;
    u_xlat0.x = dot(u_xlat5.xyz, _WorldSpaceLightPos0.xyz);
    u_xlat0.x = u_xlat0.x * u_xlat0.x;
    u_xlat0.y = u_xlat0.x * u_xlat0.x;
    u_xlat0.x = texture(unity_NHxRoughness, u_xlat0.yw).x;
    u_xlat0.x = u_xlat0.x * 16.0;
    u_xlat16_33 = (-u_xlat20) + 1.0;
    u_xlat16_10 = u_xlat16_33 * u_xlat16_33;
    u_xlat16_10 = u_xlat16_33 * u_xlat16_10;
    u_xlat16_10 = u_xlat16_33 * u_xlat16_10;
    u_xlat16_33 = (-_Metallic) * 0.779083729 + 0.779083729;
    u_xlat16_34 = (-u_xlat16_33) + 1.0;
    u_xlat16_34 = u_xlat16_34 + _Glossiness;
#ifdef UNITY_ADRENO_ES3
    u_xlat16_34 = min(max(u_xlat16_34, 0.0), 1.0);
#else
    u_xlat16_34 = clamp(u_xlat16_34, 0.0, 1.0);
#endif
    u_xlat16_2.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_7.xyz = _Color.xyz * u_xlat16_2.xyz + vec3(-0.220916301, -0.220916301, -0.220916301);
    u_xlat16_2.xyz = u_xlat16_2.xyz * _Color.xyz;
    u_xlat16_8.xyz = vec3(u_xlat16_33) * u_xlat16_2.xyz;
    u_xlat16_7.xyz = vec3(vec3(_Metallic, _Metallic, _Metallic)) * u_xlat16_7.xyz + vec3(0.220916301, 0.220916301, 0.220916301);
    u_xlat16_9.xyz = vec3(u_xlat16_34) + (-u_xlat16_7.xyz);
    u_xlat16_9.xyz = vec3(u_xlat16_10) * u_xlat16_9.xyz + u_xlat16_7.xyz;
    u_xlat16_7.xyz = u_xlat0.xxx * u_xlat16_7.xyz + u_xlat16_8.xyz;
    u_xlat16_3.xyz = u_xlat16_3.xyz * u_xlat16_9.xyz;
    u_xlat16_3.xyz = u_xlat16_4.xyz * u_xlat16_8.xyz + u_xlat16_3.xyz;
    SV_Target0.xyz = u_xlat16_7.xyz * u_xlat16_6.xyz + u_xlat16_3.xyz;
    SV_Target0.w = 1.0;
    return;
}

