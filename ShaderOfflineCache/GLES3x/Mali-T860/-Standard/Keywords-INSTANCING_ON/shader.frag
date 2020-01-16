#version 300 es

precision highp float;
precision highp int;
uniform 	mediump vec4 _Color;
uniform 	mediump float _Metallic;
uniform 	float _Glossiness;
uniform 	mediump float _OcclusionStrength;
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _OcclusionMap;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD4;
layout(location = 0) out mediump vec4 SV_Target0;
layout(location = 1) out mediump vec4 SV_Target1;
layout(location = 2) out mediump vec4 SV_Target2;
layout(location = 3) out mediump vec4 SV_Target3;
vec3 u_xlat0;
mediump vec3 u_xlat16_0;
mediump float u_xlat16_1;
mediump vec3 u_xlat16_2;
mediump vec3 u_xlat16_4;
void main()
{
    u_xlat16_0.x = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_1 = (-_OcclusionStrength) + 1.0;
    SV_Target0.w = u_xlat16_0.x * _OcclusionStrength + u_xlat16_1;
    u_xlat16_1 = (-_Metallic) * 0.779083729 + 0.779083729;
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_2.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_4.xyz = _Color.xyz * u_xlat16_0.xyz + vec3(-0.220916301, -0.220916301, -0.220916301);
    SV_Target1.xyz = vec3(vec3(_Metallic, _Metallic, _Metallic)) * u_xlat16_4.xyz + vec3(0.220916301, 0.220916301, 0.220916301);
    SV_Target0.xyz = vec3(u_xlat16_1) * u_xlat16_2.xyz;
    SV_Target1.w = _Glossiness;
    u_xlat0.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat0.x = inversesqrt(u_xlat0.x);
    u_xlat0.xyz = u_xlat0.xxx * vs_TEXCOORD4.xyz;
    u_xlat0.xyz = u_xlat0.xyz * vec3(0.5, 0.5, 0.5) + vec3(0.5, 0.5, 0.5);
    SV_Target2.xyz = u_xlat0.xyz;
    SV_Target2.w = 1.0;
    SV_Target3 = vec4(1.0, 1.0, 1.0, 1.0);
    return;
}

