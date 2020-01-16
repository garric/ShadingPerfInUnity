#version 300 es
#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
#endif

precision highp float;
precision highp int;
uniform 	mediump vec4 _WorldSpaceLightPos0;
uniform 	mediump vec4 unity_SpecCube0_HDR;
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _SpecColor;
uniform 	mediump vec4 _Color;
uniform 	float _Glossiness;
uniform 	mediump vec4 _EmissionColor;
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _BumpMap;
uniform mediump sampler2D _OcclusionMap;
uniform highp sampler2D unity_NHxRoughness;
uniform mediump sampler2D _EmissionMap;
uniform mediump samplerCube unity_SpecCube0;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD2;
in highp vec4 vs_TEXCOORD3;
in highp vec4 vs_TEXCOORD4;
layout(location = 0) out mediump vec4 SV_Target0;
vec4 u_xlat0;
mediump vec3 u_xlat16_0;
mediump vec3 u_xlat16_1;
vec3 u_xlat2;
mediump vec4 u_xlat16_2;
mediump vec3 u_xlat16_3;
mediump vec3 u_xlat16_4;
mediump vec3 u_xlat16_5;
mediump vec3 u_xlat16_7;
float u_xlat12;
mediump float u_xlat16_19;
mediump float u_xlat16_21;
void main()
{
    u_xlat0.xw = (-vec2(_Glossiness)) + vec2(1.0, 1.0);
    u_xlat16_1.x = (-u_xlat0.x) * 0.699999988 + 1.70000005;
    u_xlat16_1.x = u_xlat0.x * u_xlat16_1.x;
    u_xlat16_1.x = u_xlat16_1.x * 6.0;
    u_xlat16_2.xyz = texture(_BumpMap, vs_TEXCOORD0.xy).xyz;
    u_xlat16_7.xyz = u_xlat16_2.xyz * vec3(2.0, 2.0, 2.0) + vec3(-1.0, -1.0, -1.0);
    u_xlat16_3.xyz = u_xlat16_7.yyy * vs_TEXCOORD3.xyz;
    u_xlat16_3.xyz = vs_TEXCOORD2.xyz * u_xlat16_7.xxx + u_xlat16_3.xyz;
    u_xlat16_7.xyz = vs_TEXCOORD4.xyz * u_xlat16_7.zzz + u_xlat16_3.xyz;
    u_xlat16_3.x = dot(vs_TEXCOORD1.xyz, u_xlat16_7.xyz);
    u_xlat16_3.x = u_xlat16_3.x + u_xlat16_3.x;
    u_xlat16_3.xyz = u_xlat16_7.xyz * (-u_xlat16_3.xxx) + vs_TEXCOORD1.xyz;
    u_xlat16_2 = textureLod(unity_SpecCube0, u_xlat16_3.xyz, u_xlat16_1.x);
    u_xlat16_1.x = u_xlat16_2.w + -1.0;
    u_xlat16_1.x = unity_SpecCube0_HDR.w * u_xlat16_1.x + 1.0;
    u_xlat16_1.x = u_xlat16_1.x * unity_SpecCube0_HDR.x;
    u_xlat16_3.xyz = u_xlat16_2.xyz * u_xlat16_1.xxx;
    u_xlat16_0.x = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_3.xyz = u_xlat16_0.xxx * u_xlat16_3.xyz;
    u_xlat0.x = dot((-vs_TEXCOORD1.xyz), u_xlat16_7.xyz);
    u_xlat12 = u_xlat0.x;
#ifdef UNITY_ADRENO_ES3
    u_xlat12 = min(max(u_xlat12, 0.0), 1.0);
#else
    u_xlat12 = clamp(u_xlat12, 0.0, 1.0);
#endif
    u_xlat0.x = u_xlat0.x + u_xlat0.x;
    u_xlat2.xyz = u_xlat16_7.xyz * (-u_xlat0.xxx) + (-vs_TEXCOORD1.xyz);
    u_xlat16_0.x = dot(u_xlat16_7.xyz, _WorldSpaceLightPos0.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat16_0.x = min(max(u_xlat16_0.x, 0.0), 1.0);
#else
    u_xlat16_0.x = clamp(u_xlat16_0.x, 0.0, 1.0);
#endif
    u_xlat16_1.xyz = u_xlat16_0.xxx * _LightColor0.xyz;
    u_xlat0.x = dot(u_xlat2.xyz, _WorldSpaceLightPos0.xyz);
    u_xlat0.x = u_xlat0.x * u_xlat0.x;
    u_xlat0.y = u_xlat0.x * u_xlat0.x;
    u_xlat0.x = texture(unity_NHxRoughness, u_xlat0.yw).x;
    u_xlat0.x = u_xlat0.x * 16.0;
    u_xlat16_4.xyz = u_xlat0.xxx * _SpecColor.xyz;
    u_xlat16_19 = (-u_xlat12) + 1.0;
    u_xlat16_0.x = u_xlat16_19 * u_xlat16_19;
    u_xlat16_0.x = u_xlat16_19 * u_xlat16_0.x;
    u_xlat16_0.x = u_xlat16_19 * u_xlat16_0.x;
    u_xlat16_19 = (-_SpecColor.x) + 1.0;
    u_xlat16_21 = (-u_xlat16_19) + 1.0;
    u_xlat16_21 = u_xlat16_21 + _Glossiness;
#ifdef UNITY_ADRENO_ES3
    u_xlat16_21 = min(max(u_xlat16_21, 0.0), 1.0);
#else
    u_xlat16_21 = clamp(u_xlat16_21, 0.0, 1.0);
#endif
    u_xlat16_5.xyz = vec3(u_xlat16_21) + (-_SpecColor.xyz);
    u_xlat16_5.xyz = u_xlat16_0.xxx * u_xlat16_5.xyz + _SpecColor.xyz;
    u_xlat16_3.xyz = u_xlat16_3.xyz * u_xlat16_5.xyz;
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_0.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_4.xyz = u_xlat16_0.xyz * vec3(u_xlat16_19) + u_xlat16_4.xyz;
    u_xlat16_1.xyz = u_xlat16_4.xyz * u_xlat16_1.xyz + u_xlat16_3.xyz;
    u_xlat16_0.xyz = texture(_EmissionMap, vs_TEXCOORD0.xy).xyz;
    SV_Target0.xyz = u_xlat16_0.xyz * _EmissionColor.xyz + u_xlat16_1.xyz;
    SV_Target0.w = 1.0;
    return;
}

