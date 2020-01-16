#version 300 es

precision highp float;
precision highp int;
uniform 	mediump vec4 _SpecColor;
uniform 	mediump vec4 _Color;
uniform 	mediump float _BumpScale;
uniform 	float _Glossiness;
uniform 	mediump float _OcclusionStrength;
uniform 	mediump vec4 _EmissionColor;
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _BumpMap;
uniform mediump sampler2D _OcclusionMap;
uniform mediump sampler2D _EmissionMap;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD2;
in highp vec4 vs_TEXCOORD3;
in highp vec4 vs_TEXCOORD4;
layout(location = 0) out mediump vec4 SV_Target0;
layout(location = 1) out mediump vec4 SV_Target1;
layout(location = 2) out mediump vec4 SV_Target2;
layout(location = 3) out mediump vec4 SV_Target3;
mediump vec4 u_xlat16_0;
mediump vec3 u_xlat16_1;
mediump vec3 u_xlat16_2;
void main()
{
    u_xlat16_0.x = max(_SpecColor.y, _SpecColor.x);
    u_xlat16_0.x = max(u_xlat16_0.x, _SpecColor.z);
    u_xlat16_0.x = (-u_xlat16_0.x) + 1.0;
    u_xlat16_1.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_1.xyz = u_xlat16_1.xyz * _Color.xyz;
    SV_Target0.xyz = u_xlat16_0.xxx * u_xlat16_1.xyz;
    u_xlat16_1.x = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_0.x = (-_OcclusionStrength) + 1.0;
    SV_Target0.w = u_xlat16_1.x * _OcclusionStrength + u_xlat16_0.x;
    SV_Target1.xyz = _SpecColor.xyz;
    SV_Target1.w = _Glossiness;
    u_xlat16_1.xyz = texture(_BumpMap, vs_TEXCOORD0.xy).xyz;
    u_xlat16_0.xyz = u_xlat16_1.xyz * vec3(2.0, 2.0, 2.0) + vec3(-1.0, -1.0, -1.0);
    u_xlat16_0.xy = u_xlat16_0.xy * vec2(_BumpScale);
    u_xlat16_2.xyz = u_xlat16_0.yyy * vs_TEXCOORD3.xyz;
    u_xlat16_0.xyw = vs_TEXCOORD2.xyz * u_xlat16_0.xxx + u_xlat16_2.xyz;
    u_xlat16_0.xyz = vs_TEXCOORD4.xyz * u_xlat16_0.zzz + u_xlat16_0.xyw;
    u_xlat16_1.x = dot(u_xlat16_0.xyz, u_xlat16_0.xyz);
    u_xlat16_1.x = inversesqrt(u_xlat16_1.x);
    u_xlat16_1.xyz = u_xlat16_0.xyz * u_xlat16_1.xxx;
    u_xlat16_1.xyz = u_xlat16_1.xyz * vec3(0.5, 0.5, 0.5) + vec3(0.5, 0.5, 0.5);
    SV_Target2.xyz = u_xlat16_1.xyz;
    SV_Target2.w = 1.0;
    u_xlat16_1.xyz = texture(_EmissionMap, vs_TEXCOORD0.xy).xyz;
    u_xlat16_1.xyz = u_xlat16_1.xyz * _EmissionColor.xyz;
    SV_Target3.xyz = exp2((-u_xlat16_1.xyz));
    SV_Target3.w = 1.0;
    return;
}

