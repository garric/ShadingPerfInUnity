#version 300 es

precision highp float;
precision highp int;
uniform 	vec4 _NormalizedComplexity;
layout(location = 0) out mediump vec4 SV_Target0;
vec4 u_xlat0;
void main()
{
    u_xlat0.xyz = _NormalizedComplexity.xyz;
    u_xlat0.w = 1.0;
    SV_Target0 = u_xlat0;
    return;
}

