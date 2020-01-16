#version 300 es
#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
#endif
#ifndef UNITY_RUNTIME_INSTANCING_ARRAY_SIZE
	#define UNITY_RUNTIME_INSTANCING_ARRAY_SIZE 2
#endif

precision highp float;
precision highp int;
uniform 	mediump vec4 _WorldSpaceLightPos0;
uniform 	vec4 unity_SpecCube0_BoxMax;
uniform 	vec4 unity_SpecCube0_BoxMin;
uniform 	vec4 unity_SpecCube0_ProbePosition;
uniform 	mediump vec4 unity_SpecCube0_HDR;
uniform 	vec4 unity_SpecCube1_BoxMax;
uniform 	vec4 unity_SpecCube1_BoxMin;
uniform 	vec4 unity_SpecCube1_ProbePosition;
uniform 	mediump vec4 unity_SpecCube1_HDR;
uniform 	int unity_BaseInstanceID;
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _Color;
uniform 	mediump float _Metallic;
uniform 	float _Glossiness;
uniform 	mediump float _OcclusionStrength;
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
uniform mediump samplerCube unity_SpecCube0;
uniform mediump samplerCube unity_SpecCube1;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD4;
in mediump vec4 vs_TEXCOORD5;
in highp vec3 vs_TEXCOORD8;
flat in highp uint vs_SV_InstanceID0;
layout(location = 0) out mediump vec4 SV_Target0;
vec4 u_xlat0;
mediump vec3 u_xlat16_0;
vec3 u_xlat1;
mediump vec3 u_xlat16_1;
bool u_xlatb1;
mediump vec3 u_xlat16_2;
mediump vec3 u_xlat16_3;
mediump vec4 u_xlat16_4;
int u_xlati4;
mediump vec4 u_xlat16_5;
mediump vec3 u_xlat16_6;
mediump vec4 u_xlat16_7;
vec3 u_xlat8;
mediump vec3 u_xlat16_8;
vec3 u_xlat9;
vec3 u_xlat10;
bvec3 u_xlatb11;
vec3 u_xlat12;
mediump vec3 u_xlat16_12;
mediump vec3 u_xlat16_13;
float u_xlat14;
vec3 u_xlat15;
float u_xlat18;
mediump float u_xlat16_18;
mediump vec3 u_xlat16_27;
float u_xlat28;
float u_xlat29;
float u_xlat42;
mediump float u_xlat16_42;
bool u_xlatb42;
float u_xlat43;
mediump float u_xlat16_44;
mediump float u_xlat16_45;
mediump float u_xlat16_47;
mediump float u_xlat16_48;
mediump float u_xlat16_54;
void main()
{
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_1.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_2.xyz = _Color.xyz * u_xlat16_0.xyz + vec3(-0.220916301, -0.220916301, -0.220916301);
    u_xlat16_2.xyz = vec3(vec3(_Metallic, _Metallic, _Metallic)) * u_xlat16_2.xyz + vec3(0.220916301, 0.220916301, 0.220916301);
    u_xlat16_44 = (-_Metallic) * 0.779083729 + 0.779083729;
    u_xlat16_3.xyz = u_xlat16_1.xyz * vec3(u_xlat16_44);
    u_xlat0.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat0.x = inversesqrt(u_xlat0.x);
    u_xlat0.xyz = u_xlat0.xxx * vs_TEXCOORD4.xyz;
    u_xlat1.x = dot(vs_TEXCOORD1.xyz, vs_TEXCOORD1.xyz);
    u_xlat1.x = inversesqrt(u_xlat1.x);
    u_xlat15.xyz = u_xlat1.xxx * vs_TEXCOORD1.xyz;
    u_xlati4 = int(vs_SV_InstanceID0) + unity_BaseInstanceID;
    u_xlati4 = u_xlati4 * 7;
    u_xlat16_18 = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_45 = (-_OcclusionStrength) + 1.0;
    u_xlat16_45 = u_xlat16_18 * _OcclusionStrength + u_xlat16_45;
    u_xlat18 = (-_Glossiness) + 1.0;
    u_xlat16_5.x = dot(u_xlat15.xyz, u_xlat0.xyz);
    u_xlat16_5.x = u_xlat16_5.x + u_xlat16_5.x;
    u_xlat16_5.xyz = u_xlat0.xyz * (-u_xlat16_5.xxx) + u_xlat15.xyz;
    u_xlat16_6.xyz = _LightColor0.xyz * unity_Builtins2Array[u_xlati4 / 7].unity_SHCArray.www;
    u_xlat0.w = 1.0;
    u_xlat16_7.x = dot(unity_Builtins2Array[u_xlati4 / 7].unity_SHArArray, u_xlat0);
    u_xlat16_7.y = dot(unity_Builtins2Array[u_xlati4 / 7].unity_SHAgArray, u_xlat0);
    u_xlat16_7.z = dot(unity_Builtins2Array[u_xlati4 / 7].unity_SHAbArray, u_xlat0);
    u_xlat16_7.xyz = u_xlat16_7.xyz + vs_TEXCOORD5.xyz;
    u_xlat16_7.xyz = max(u_xlat16_7.xyz, vec3(0.0, 0.0, 0.0));
    u_xlat16_4.xzw = log2(u_xlat16_7.xyz);
    u_xlat16_4.xzw = u_xlat16_4.xzw * vec3(0.416666657, 0.416666657, 0.416666657);
    u_xlat16_4.xzw = exp2(u_xlat16_4.xzw);
    u_xlat16_4.xzw = u_xlat16_4.xzw * vec3(1.05499995, 1.05499995, 1.05499995) + vec3(-0.0549999997, -0.0549999997, -0.0549999997);
    u_xlat16_4.xzw = max(u_xlat16_4.xzw, vec3(0.0, 0.0, 0.0));
#ifdef UNITY_ADRENO_ES3
    u_xlatb42 = !!(0.0<unity_SpecCube0_ProbePosition.w);
#else
    u_xlatb42 = 0.0<unity_SpecCube0_ProbePosition.w;
#endif
    if(u_xlatb42){
        u_xlat16_42 = dot(u_xlat16_5.xyz, u_xlat16_5.xyz);
        u_xlat16_42 = inversesqrt(u_xlat16_42);
        u_xlat8.xyz = vec3(u_xlat16_42) * u_xlat16_5.xyz;
        u_xlat9.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMax.xyz;
        u_xlat9.xyz = u_xlat9.xyz / u_xlat8.xyz;
        u_xlat10.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMin.xyz;
        u_xlat10.xyz = u_xlat10.xyz / u_xlat8.xyz;
        u_xlatb11.xyz = lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat8.xyzx).xyz;
        {
            vec3 hlslcc_movcTemp = u_xlat9;
            hlslcc_movcTemp.x = (u_xlatb11.x) ? u_xlat9.x : u_xlat10.x;
            hlslcc_movcTemp.y = (u_xlatb11.y) ? u_xlat9.y : u_xlat10.y;
            hlslcc_movcTemp.z = (u_xlatb11.z) ? u_xlat9.z : u_xlat10.z;
            u_xlat9 = hlslcc_movcTemp;
        }
        u_xlat42 = min(u_xlat9.y, u_xlat9.x);
        u_xlat42 = min(u_xlat9.z, u_xlat42);
        u_xlat9.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube0_ProbePosition.xyz);
        u_xlat8.xyz = u_xlat8.xyz * vec3(u_xlat42) + u_xlat9.xyz;
    } else {
        u_xlat8.xyz = u_xlat16_5.xyz;
    //ENDIF
    }
    u_xlat16_47 = (-u_xlat18) * 0.699999988 + 1.70000005;
    u_xlat16_47 = u_xlat18 * u_xlat16_47;
    u_xlat16_47 = u_xlat16_47 * 6.0;
    u_xlat16_7 = textureLod(unity_SpecCube0, u_xlat8.xyz, u_xlat16_47);
    u_xlat16_48 = u_xlat16_7.w + -1.0;
    u_xlat16_48 = unity_SpecCube0_HDR.w * u_xlat16_48 + 1.0;
    u_xlat16_48 = u_xlat16_48 * unity_SpecCube0_HDR.x;
    u_xlat16_12.xyz = u_xlat16_7.xyz * vec3(u_xlat16_48);
#ifdef UNITY_ADRENO_ES3
    u_xlatb42 = !!(unity_SpecCube0_BoxMin.w<0.999989986);
#else
    u_xlatb42 = unity_SpecCube0_BoxMin.w<0.999989986;
#endif
    if(u_xlatb42){
#ifdef UNITY_ADRENO_ES3
        u_xlatb42 = !!(0.0<unity_SpecCube1_ProbePosition.w);
#else
        u_xlatb42 = 0.0<unity_SpecCube1_ProbePosition.w;
#endif
        if(u_xlatb42){
            u_xlat16_42 = dot(u_xlat16_5.xyz, u_xlat16_5.xyz);
            u_xlat16_42 = inversesqrt(u_xlat16_42);
            u_xlat8.xyz = vec3(u_xlat16_42) * u_xlat16_5.xyz;
            u_xlat9.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube1_BoxMax.xyz;
            u_xlat9.xyz = u_xlat9.xyz / u_xlat8.xyz;
            u_xlat10.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube1_BoxMin.xyz;
            u_xlat10.xyz = u_xlat10.xyz / u_xlat8.xyz;
            u_xlatb11.xyz = lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat8.xyzx).xyz;
            {
                vec3 hlslcc_movcTemp = u_xlat9;
                hlslcc_movcTemp.x = (u_xlatb11.x) ? u_xlat9.x : u_xlat10.x;
                hlslcc_movcTemp.y = (u_xlatb11.y) ? u_xlat9.y : u_xlat10.y;
                hlslcc_movcTemp.z = (u_xlatb11.z) ? u_xlat9.z : u_xlat10.z;
                u_xlat9 = hlslcc_movcTemp;
            }
            u_xlat42 = min(u_xlat9.y, u_xlat9.x);
            u_xlat42 = min(u_xlat9.z, u_xlat42);
            u_xlat9.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube1_ProbePosition.xyz);
            u_xlat8.xyz = u_xlat8.xyz * vec3(u_xlat42) + u_xlat9.xyz;
        } else {
            u_xlat8.xyz = u_xlat16_5.xyz;
        //ENDIF
        }
        u_xlat16_5 = textureLod(unity_SpecCube1, u_xlat8.xyz, u_xlat16_47);
        u_xlat16_54 = u_xlat16_5.w + -1.0;
        u_xlat16_54 = unity_SpecCube1_HDR.w * u_xlat16_54 + 1.0;
        u_xlat16_54 = u_xlat16_54 * unity_SpecCube1_HDR.x;
        u_xlat16_13.xyz = u_xlat16_5.xyz * vec3(u_xlat16_54);
        u_xlat16_8.xyz = vec3(u_xlat16_48) * u_xlat16_7.xyz + (-u_xlat16_13.xyz);
        u_xlat12.xyz = unity_SpecCube0_BoxMin.www * u_xlat16_8.xyz + u_xlat16_13.xyz;
        u_xlat16_12.xyz = u_xlat12.xyz;
    //ENDIF
    }
    u_xlat16_12.xyz = vec3(u_xlat16_45) * u_xlat16_12.xyz;
    u_xlat8.xyz = (-vs_TEXCOORD1.xyz) * u_xlat1.xxx + _WorldSpaceLightPos0.xyz;
    u_xlat42 = dot(u_xlat8.xyz, u_xlat8.xyz);
    u_xlat42 = max(u_xlat42, 0.00100000005);
    u_xlat42 = inversesqrt(u_xlat42);
    u_xlat8.xyz = vec3(u_xlat42) * u_xlat8.xyz;
    u_xlat42 = dot(u_xlat0.xyz, (-u_xlat15.xyz));
    u_xlat1.x = dot(u_xlat0.xyz, _WorldSpaceLightPos0.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat1.x = min(max(u_xlat1.x, 0.0), 1.0);
#else
    u_xlat1.x = clamp(u_xlat1.x, 0.0, 1.0);
#endif
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat8.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat14 = dot(_WorldSpaceLightPos0.xyz, u_xlat8.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat14 = min(max(u_xlat14, 0.0), 1.0);
#else
    u_xlat14 = clamp(u_xlat14, 0.0, 1.0);
#endif
    u_xlat16_48 = u_xlat14 + u_xlat14;
    u_xlat16_48 = u_xlat14 * u_xlat16_48;
    u_xlat16_48 = u_xlat16_48 * u_xlat18 + -0.5;
    u_xlat16_54 = (-u_xlat1.x) + 1.0;
    u_xlat16_13.x = u_xlat16_54 * u_xlat16_54;
    u_xlat16_13.x = u_xlat16_13.x * u_xlat16_13.x;
    u_xlat16_54 = u_xlat16_54 * u_xlat16_13.x;
    u_xlat16_54 = u_xlat16_48 * u_xlat16_54 + 1.0;
    u_xlat16_13.x = -abs(u_xlat42) + 1.0;
    u_xlat16_27.x = u_xlat16_13.x * u_xlat16_13.x;
    u_xlat16_27.x = u_xlat16_27.x * u_xlat16_27.x;
    u_xlat16_13.x = u_xlat16_13.x * u_xlat16_27.x;
    u_xlat16_48 = u_xlat16_48 * u_xlat16_13.x + 1.0;
    u_xlat16_48 = u_xlat16_48 * u_xlat16_54;
    u_xlat28 = u_xlat1.x * u_xlat16_48;
    u_xlat15.x = u_xlat18 * u_xlat18;
    u_xlat15.x = max(u_xlat15.x, 0.00200000009);
    u_xlat29 = (-u_xlat15.x) + 1.0;
    u_xlat43 = abs(u_xlat42) * u_xlat29 + u_xlat15.x;
    u_xlat29 = u_xlat1.x * u_xlat29 + u_xlat15.x;
    u_xlat42 = abs(u_xlat42) * u_xlat29;
    u_xlat42 = u_xlat1.x * u_xlat43 + u_xlat42;
    u_xlat42 = u_xlat42 + 9.99999975e-06;
    u_xlat42 = 0.5 / u_xlat42;
    u_xlat29 = u_xlat15.x * u_xlat15.x;
    u_xlat43 = u_xlat0.x * u_xlat29 + (-u_xlat0.x);
    u_xlat0.x = u_xlat43 * u_xlat0.x + 1.0;
    u_xlat29 = u_xlat29 * 0.318309873;
    u_xlat0.x = u_xlat0.x * u_xlat0.x + 1.00000001e-07;
    u_xlat0.x = u_xlat29 / u_xlat0.x;
    u_xlat0.x = u_xlat0.x * u_xlat42;
    u_xlat0.x = u_xlat0.x * 3.14159274;
    u_xlat0.x = max(u_xlat0.x, 9.99999975e-05);
    u_xlat0.x = sqrt(u_xlat0.x);
    u_xlat0.x = u_xlat1.x * u_xlat0.x;
    u_xlat42 = u_xlat15.x * u_xlat18;
    u_xlat42 = (-u_xlat42) * 0.280000001 + 1.0;
    u_xlat16_48 = dot(u_xlat16_2.xyz, u_xlat16_2.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlatb1 = !!(u_xlat16_48!=0.0);
#else
    u_xlatb1 = u_xlat16_48!=0.0;
#endif
    u_xlat1.x = u_xlatb1 ? 1.0 : float(0.0);
    u_xlat0.x = u_xlat0.x * u_xlat1.x;
    u_xlat16_44 = (-u_xlat16_44) + 1.0;
    u_xlat16_44 = u_xlat16_44 + _Glossiness;
#ifdef UNITY_ADRENO_ES3
    u_xlat16_44 = min(max(u_xlat16_44, 0.0), 1.0);
#else
    u_xlat16_44 = clamp(u_xlat16_44, 0.0, 1.0);
#endif
    u_xlat16_27.xyz = vec3(u_xlat28) * u_xlat16_6.xyz;
    u_xlat16_27.xyz = u_xlat16_4.xzw * vec3(u_xlat16_45) + u_xlat16_27.xyz;
    u_xlat1.xyz = u_xlat16_6.xyz * u_xlat0.xxx;
    u_xlat16_45 = (-u_xlat14) + 1.0;
    u_xlat16_6.x = u_xlat16_45 * u_xlat16_45;
    u_xlat16_6.x = u_xlat16_6.x * u_xlat16_6.x;
    u_xlat16_45 = u_xlat16_45 * u_xlat16_6.x;
    u_xlat16_6.xyz = (-u_xlat16_2.xyz) + vec3(1.0, 1.0, 1.0);
    u_xlat16_6.xyz = u_xlat16_6.xyz * vec3(u_xlat16_45) + u_xlat16_2.xyz;
    u_xlat0.xyz = u_xlat1.xyz * u_xlat16_6.xyz;
    u_xlat0.xyz = u_xlat16_3.xyz * u_xlat16_27.xyz + u_xlat0.xyz;
    u_xlat16_3.xyz = u_xlat16_12.xyz * vec3(u_xlat42);
    u_xlat16_6.xyz = (-u_xlat16_2.xyz) + vec3(u_xlat16_44);
    u_xlat16_2.xyz = u_xlat16_13.xxx * u_xlat16_6.xyz + u_xlat16_2.xyz;
    u_xlat0.xyz = u_xlat16_3.xyz * u_xlat16_2.xyz + u_xlat0.xyz;
    SV_Target0.xyz = u_xlat0.xyz;
    SV_Target0.w = 1.0;
    return;
}

