#version 300 es

precision highp float;
precision highp int;
uniform 	mediump vec4 _Color;
layout(location = 0) out mediump vec4 SV_Target0;
void main()
{
    SV_Target0.xyz = _Color.xyz;
    SV_Target0.w = 1.0;
    return;
}

