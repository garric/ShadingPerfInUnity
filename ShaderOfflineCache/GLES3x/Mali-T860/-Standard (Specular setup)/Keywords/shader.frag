#version 300 es

precision highp float;
precision highp int;
uniform 	mediump vec4 _SpecColor;
uniform 	mediump vec4 _Color;
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
mediump float u_xlat16_0;
vec3 u_xlat1;
mediump vec3 u_xlat16_1;
void main()
{
    u_xlat16_0 = max(_SpecColor.y, _SpecColor.x);
    u_xlat16_0 = max(u_xlat16_0, _SpecColor.z);
    u_xlat16_0 = (-u_xlat16_0) + 1.0;
    u_xlat16_1.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_1.xyz = u_xlat16_1.xyz * _Color.xyz;
    SV_Target0.xyz = vec3(u_xlat16_0) * u_xlat16_1.xyz;
    u_xlat16_1.x = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_0 = (-_OcclusionStrength) + 1.0;
    SV_Target0.w = u_xlat16_1.x * _OcclusionStrength + u_xlat16_0;
    SV_Target1.xyz = _SpecColor.xyz;
    SV_Target1.w = _Glossiness;
    u_xlat1.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat1.x = inversesqrt(u_xlat1.x);
    u_xlat1.xyz = u_xlat1.xxx * vs_TEXCOORD4.xyz;
    u_xlat1.xyz = u_xlat1.xyz * vec3(0.5, 0.5, 0.5) + vec3(0.5, 0.5, 0.5);
    SV_Target2.xyz = u_xlat1.xyz;
    SV_Target2.w = 1.0;
    SV_Target3 = vec4(1.0, 1.0, 1.0, 1.0);
    return;
}

