#version 300 es
#ifndef UNITY_RUNTIME_INSTANCING_ARRAY_SIZE
	#define UNITY_RUNTIME_INSTANCING_ARRAY_SIZE 2
#endif

precision highp float;
precision highp int;
uniform 	int unity_BaseInstanceID;
uniform 	mediump vec4 _Color;
uniform 	mediump float _Metallic;
uniform 	float _Glossiness;
uniform 	mediump float _OcclusionStrength;
uniform 	mediump vec4 _EmissionColor;
struct unity_Builtins2Array_Type {
	mediump vec4 unity_SHArArray;
	mediump vec4 unity_SHAgArray;
	mediump vec4 unity_SHAbArray;
	mediump vec4 unity_SHBrArray;
	mediump vec4 unity_SHBgArray;
	mediump vec4 unity_SHBbArray;
	mediump vec4 unity_SHCArray;
};
layout(std140) uniform UnityInstancing_PerDraw2 {
	unity_Builtins2Array_Type unity_Builtins2Array[UNITY_RUNTIME_INSTANCING_ARRAY_SIZE];
};
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _OcclusionMap;
uniform mediump sampler2D _EmissionMap;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD4;
in mediump vec4 vs_TEXCOORD5;
flat in highp uint vs_SV_InstanceID0;
layout(location = 0) out mediump vec4 SV_Target0;
layout(location = 1) out mediump vec4 SV_Target1;
layout(location = 2) out mediump vec4 SV_Target2;
layout(location = 3) out mediump vec4 SV_Target3;
mediump vec4 u_xlat16_0;
vec4 u_xlat1;
mediump float u_xlat16_1;
vec3 u_xlat2;
mediump vec3 u_xlat16_2;
int u_xlati2;
mediump vec3 u_xlat16_3;
mediump vec3 u_xlat16_4;
mediump vec3 u_xlat16_6;
void main()
{
    u_xlat16_0.x = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_1 = (-_OcclusionStrength) + 1.0;
    u_xlat16_0.w = u_xlat16_0.x * _OcclusionStrength + u_xlat16_1;
    u_xlat16_1 = (-_Metallic) * 0.779083729 + 0.779083729;
    u_xlat16_2.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_3.xyz = u_xlat16_2.xyz * _Color.xyz;
    u_xlat16_6.xyz = _Color.xyz * u_xlat16_2.xyz + vec3(-0.220916301, -0.220916301, -0.220916301);
    SV_Target1.xyz = vec3(vec3(_Metallic, _Metallic, _Metallic)) * u_xlat16_6.xyz + vec3(0.220916301, 0.220916301, 0.220916301);
    u_xlat16_0.xyz = vec3(u_xlat16_1) * u_xlat16_3.xyz;
    SV_Target0 = u_xlat16_0;
    SV_Target1.w = _Glossiness;
    u_xlat2.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat2.x = inversesqrt(u_xlat2.x);
    u_xlat1.xyz = u_xlat2.xxx * vs_TEXCOORD4.xyz;
    u_xlat2.xyz = u_xlat1.xyz * vec3(0.5, 0.5, 0.5) + vec3(0.5, 0.5, 0.5);
    SV_Target2.xyz = u_xlat2.xyz;
    SV_Target2.w = 1.0;
    u_xlati2 = int(vs_SV_InstanceID0) + unity_BaseInstanceID;
    u_xlati2 = u_xlati2 * 7;
    u_xlat1.w = 1.0;
    u_xlat16_4.x = dot(unity_Builtins2Array[u_xlati2 / 7].unity_SHArArray, u_xlat1);
    u_xlat16_4.y = dot(unity_Builtins2Array[u_xlati2 / 7].unity_SHAgArray, u_xlat1);
    u_xlat16_4.z = dot(unity_Builtins2Array[u_xlati2 / 7].unity_SHAbArray, u_xlat1);
    u_xlat16_4.xyz = u_xlat16_4.xyz + vs_TEXCOORD5.xyz;
    u_xlat16_4.xyz = max(u_xlat16_4.xyz, vec3(0.0, 0.0, 0.0));
    u_xlat16_2.xyz = log2(u_xlat16_4.xyz);
    u_xlat16_2.xyz = u_xlat16_2.xyz * vec3(0.416666657, 0.416666657, 0.416666657);
    u_xlat16_2.xyz = exp2(u_xlat16_2.xyz);
    u_xlat16_2.xyz = u_xlat16_2.xyz * vec3(1.05499995, 1.05499995, 1.05499995) + vec3(-0.0549999997, -0.0549999997, -0.0549999997);
    u_xlat16_2.xyz = max(u_xlat16_2.xyz, vec3(0.0, 0.0, 0.0));
    u_xlat16_4.xyz = u_xlat16_0.www * u_xlat16_2.xyz;
    u_xlat16_2.xyz = texture(_EmissionMap, vs_TEXCOORD0.xy).xyz;
    u_xlat16_2.xyz = u_xlat16_2.xyz * _EmissionColor.xyz;
    SV_Target3.xyz = u_xlat16_0.xyz * u_xlat16_4.xyz + u_xlat16_2.xyz;
    SV_Target3.w = 1.0;
    return;
}

