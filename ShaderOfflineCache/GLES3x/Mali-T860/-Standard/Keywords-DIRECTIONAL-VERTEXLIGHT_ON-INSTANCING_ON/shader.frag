#version 300 es
#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
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
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _Color;
uniform 	mediump float _Metallic;
uniform 	float _Glossiness;
uniform 	mediump float _OcclusionStrength;
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _OcclusionMap;
uniform mediump samplerCube unity_SpecCube0;
uniform mediump samplerCube unity_SpecCube1;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD4;
in highp vec3 vs_TEXCOORD8;
layout(location = 0) out mediump vec4 SV_Target0;
vec3 u_xlat0;
mediump vec3 u_xlat16_0;
vec3 u_xlat1;
mediump vec3 u_xlat16_1;
bool u_xlatb1;
mediump vec3 u_xlat16_2;
mediump vec3 u_xlat16_3;
mediump vec4 u_xlat16_4;
vec3 u_xlat5;
mediump vec4 u_xlat16_5;
bool u_xlatb5;
vec3 u_xlat6;
vec3 u_xlat7;
vec3 u_xlat8;
bvec3 u_xlatb8;
mediump vec3 u_xlat16_9;
bvec3 u_xlatb10;
mediump vec3 u_xlat16_11;
mediump vec3 u_xlat16_12;
float u_xlat13;
float u_xlat14;
vec3 u_xlat22;
mediump vec3 u_xlat16_22;
mediump vec3 u_xlat16_24;
float u_xlat26;
float u_xlat27;
float u_xlat39;
float u_xlat40;
mediump float u_xlat16_40;
mediump float u_xlat16_41;
mediump float u_xlat16_42;
mediump float u_xlat16_43;
float u_xlat44;
mediump float u_xlat16_44;
bool u_xlatb44;
mediump float u_xlat16_48;
void main()
{
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_1.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_2.xyz = _Color.xyz * u_xlat16_0.xyz + vec3(-0.220916301, -0.220916301, -0.220916301);
    u_xlat16_2.xyz = vec3(vec3(_Metallic, _Metallic, _Metallic)) * u_xlat16_2.xyz + vec3(0.220916301, 0.220916301, 0.220916301);
    u_xlat16_41 = (-_Metallic) * 0.779083729 + 0.779083729;
    u_xlat16_3.xyz = u_xlat16_1.xyz * vec3(u_xlat16_41);
    u_xlat0.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat0.x = inversesqrt(u_xlat0.x);
    u_xlat0.xyz = u_xlat0.xxx * vs_TEXCOORD4.xyz;
    u_xlat39 = dot(vs_TEXCOORD1.xyz, vs_TEXCOORD1.xyz);
    u_xlat39 = inversesqrt(u_xlat39);
    u_xlat1.xyz = vec3(u_xlat39) * vs_TEXCOORD1.xyz;
    u_xlat16_40 = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_42 = (-_OcclusionStrength) + 1.0;
    u_xlat16_42 = u_xlat16_40 * _OcclusionStrength + u_xlat16_42;
    u_xlat40 = (-_Glossiness) + 1.0;
    u_xlat16_4.x = dot(u_xlat1.xyz, u_xlat0.xyz);
    u_xlat16_4.x = u_xlat16_4.x + u_xlat16_4.x;
    u_xlat16_4.xyz = u_xlat0.xyz * (-u_xlat16_4.xxx) + u_xlat1.xyz;
#ifdef UNITY_ADRENO_ES3
    u_xlatb5 = !!(0.0<unity_SpecCube0_ProbePosition.w);
#else
    u_xlatb5 = 0.0<unity_SpecCube0_ProbePosition.w;
#endif
    if(u_xlatb5){
        u_xlat16_5.x = dot(u_xlat16_4.xyz, u_xlat16_4.xyz);
        u_xlat16_5.x = inversesqrt(u_xlat16_5.x);
        u_xlat5.xyz = u_xlat16_4.xyz * u_xlat16_5.xxx;
        u_xlat6.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMax.xyz;
        u_xlat6.xyz = u_xlat6.xyz / u_xlat5.xyz;
        u_xlat7.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMin.xyz;
        u_xlat7.xyz = u_xlat7.xyz / u_xlat5.xyz;
        u_xlatb8.xyz = lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat5.xyzx).xyz;
        {
            vec3 hlslcc_movcTemp = u_xlat6;
            hlslcc_movcTemp.x = (u_xlatb8.x) ? u_xlat6.x : u_xlat7.x;
            hlslcc_movcTemp.y = (u_xlatb8.y) ? u_xlat6.y : u_xlat7.y;
            hlslcc_movcTemp.z = (u_xlatb8.z) ? u_xlat6.z : u_xlat7.z;
            u_xlat6 = hlslcc_movcTemp;
        }
        u_xlat44 = min(u_xlat6.y, u_xlat6.x);
        u_xlat44 = min(u_xlat6.z, u_xlat44);
        u_xlat6.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube0_ProbePosition.xyz);
        u_xlat5.xyz = u_xlat5.xyz * vec3(u_xlat44) + u_xlat6.xyz;
    } else {
        u_xlat5.xyz = u_xlat16_4.xyz;
    //ENDIF
    }
    u_xlat16_43 = (-u_xlat40) * 0.699999988 + 1.70000005;
    u_xlat16_43 = u_xlat40 * u_xlat16_43;
    u_xlat16_43 = u_xlat16_43 * 6.0;
    u_xlat16_5 = textureLod(unity_SpecCube0, u_xlat5.xyz, u_xlat16_43);
    u_xlat16_9.x = u_xlat16_5.w + -1.0;
    u_xlat16_9.x = unity_SpecCube0_HDR.w * u_xlat16_9.x + 1.0;
    u_xlat16_9.x = u_xlat16_9.x * unity_SpecCube0_HDR.x;
    u_xlat16_22.xyz = u_xlat16_5.xyz * u_xlat16_9.xxx;
#ifdef UNITY_ADRENO_ES3
    u_xlatb44 = !!(unity_SpecCube0_BoxMin.w<0.999989986);
#else
    u_xlatb44 = unity_SpecCube0_BoxMin.w<0.999989986;
#endif
    if(u_xlatb44){
#ifdef UNITY_ADRENO_ES3
        u_xlatb44 = !!(0.0<unity_SpecCube1_ProbePosition.w);
#else
        u_xlatb44 = 0.0<unity_SpecCube1_ProbePosition.w;
#endif
        if(u_xlatb44){
            u_xlat16_44 = dot(u_xlat16_4.xyz, u_xlat16_4.xyz);
            u_xlat16_44 = inversesqrt(u_xlat16_44);
            u_xlat6.xyz = u_xlat16_4.xyz * vec3(u_xlat16_44);
            u_xlat7.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube1_BoxMax.xyz;
            u_xlat7.xyz = u_xlat7.xyz / u_xlat6.xyz;
            u_xlat8.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube1_BoxMin.xyz;
            u_xlat8.xyz = u_xlat8.xyz / u_xlat6.xyz;
            u_xlatb10.xyz = lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat6.xyzx).xyz;
            {
                vec3 hlslcc_movcTemp = u_xlat7;
                hlslcc_movcTemp.x = (u_xlatb10.x) ? u_xlat7.x : u_xlat8.x;
                hlslcc_movcTemp.y = (u_xlatb10.y) ? u_xlat7.y : u_xlat8.y;
                hlslcc_movcTemp.z = (u_xlatb10.z) ? u_xlat7.z : u_xlat8.z;
                u_xlat7 = hlslcc_movcTemp;
            }
            u_xlat44 = min(u_xlat7.y, u_xlat7.x);
            u_xlat44 = min(u_xlat7.z, u_xlat44);
            u_xlat7.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube1_ProbePosition.xyz);
            u_xlat6.xyz = u_xlat6.xyz * vec3(u_xlat44) + u_xlat7.xyz;
        } else {
            u_xlat6.xyz = u_xlat16_4.xyz;
        //ENDIF
        }
        u_xlat16_4 = textureLod(unity_SpecCube1, u_xlat6.xyz, u_xlat16_43);
        u_xlat16_11.x = u_xlat16_4.w + -1.0;
        u_xlat16_11.x = unity_SpecCube1_HDR.w * u_xlat16_11.x + 1.0;
        u_xlat16_11.x = u_xlat16_11.x * unity_SpecCube1_HDR.x;
        u_xlat16_11.xyz = u_xlat16_4.xyz * u_xlat16_11.xxx;
        u_xlat16_5.xyz = u_xlat16_9.xxx * u_xlat16_5.xyz + (-u_xlat16_11.xyz);
        u_xlat22.xyz = unity_SpecCube0_BoxMin.www * u_xlat16_5.xyz + u_xlat16_11.xyz;
        u_xlat16_22.xyz = u_xlat22.xyz;
    //ENDIF
    }
    u_xlat16_9.xyz = vec3(u_xlat16_42) * u_xlat16_22.xyz;
    u_xlat5.xyz = (-vs_TEXCOORD1.xyz) * vec3(u_xlat39) + _WorldSpaceLightPos0.xyz;
    u_xlat39 = dot(u_xlat5.xyz, u_xlat5.xyz);
    u_xlat39 = max(u_xlat39, 0.00100000005);
    u_xlat39 = inversesqrt(u_xlat39);
    u_xlat5.xyz = vec3(u_xlat39) * u_xlat5.xyz;
    u_xlat39 = dot(u_xlat0.xyz, (-u_xlat1.xyz));
    u_xlat1.x = dot(u_xlat0.xyz, _WorldSpaceLightPos0.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat1.x = min(max(u_xlat1.x, 0.0), 1.0);
#else
    u_xlat1.x = clamp(u_xlat1.x, 0.0, 1.0);
#endif
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat5.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat13 = dot(_WorldSpaceLightPos0.xyz, u_xlat5.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat13 = min(max(u_xlat13, 0.0), 1.0);
#else
    u_xlat13 = clamp(u_xlat13, 0.0, 1.0);
#endif
    u_xlat16_42 = u_xlat13 + u_xlat13;
    u_xlat16_42 = u_xlat13 * u_xlat16_42;
    u_xlat16_42 = u_xlat16_42 * u_xlat40 + -0.5;
    u_xlat16_48 = (-u_xlat1.x) + 1.0;
    u_xlat16_11.x = u_xlat16_48 * u_xlat16_48;
    u_xlat16_11.x = u_xlat16_11.x * u_xlat16_11.x;
    u_xlat16_48 = u_xlat16_48 * u_xlat16_11.x;
    u_xlat16_48 = u_xlat16_42 * u_xlat16_48 + 1.0;
    u_xlat16_11.x = -abs(u_xlat39) + 1.0;
    u_xlat16_24.x = u_xlat16_11.x * u_xlat16_11.x;
    u_xlat16_24.x = u_xlat16_24.x * u_xlat16_24.x;
    u_xlat16_11.x = u_xlat16_11.x * u_xlat16_24.x;
    u_xlat16_42 = u_xlat16_42 * u_xlat16_11.x + 1.0;
    u_xlat16_42 = u_xlat16_42 * u_xlat16_48;
    u_xlat26 = u_xlat1.x * u_xlat16_42;
    u_xlat14 = u_xlat40 * u_xlat40;
    u_xlat14 = max(u_xlat14, 0.00200000009);
    u_xlat27 = (-u_xlat14) + 1.0;
    u_xlat5.x = abs(u_xlat39) * u_xlat27 + u_xlat14;
    u_xlat27 = u_xlat1.x * u_xlat27 + u_xlat14;
    u_xlat39 = abs(u_xlat39) * u_xlat27;
    u_xlat39 = u_xlat1.x * u_xlat5.x + u_xlat39;
    u_xlat39 = u_xlat39 + 9.99999975e-06;
    u_xlat39 = 0.5 / u_xlat39;
    u_xlat27 = u_xlat14 * u_xlat14;
    u_xlat5.x = u_xlat0.x * u_xlat27 + (-u_xlat0.x);
    u_xlat0.x = u_xlat5.x * u_xlat0.x + 1.0;
    u_xlat27 = u_xlat27 * 0.318309873;
    u_xlat0.x = u_xlat0.x * u_xlat0.x + 1.00000001e-07;
    u_xlat0.x = u_xlat27 / u_xlat0.x;
    u_xlat0.x = u_xlat0.x * u_xlat39;
    u_xlat0.x = u_xlat0.x * 3.14159274;
    u_xlat0.x = max(u_xlat0.x, 9.99999975e-05);
    u_xlat0.x = sqrt(u_xlat0.x);
    u_xlat0.x = u_xlat1.x * u_xlat0.x;
    u_xlat39 = u_xlat14 * u_xlat40;
    u_xlat39 = (-u_xlat39) * 0.280000001 + 1.0;
    u_xlat16_42 = dot(u_xlat16_2.xyz, u_xlat16_2.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlatb1 = !!(u_xlat16_42!=0.0);
#else
    u_xlatb1 = u_xlat16_42!=0.0;
#endif
    u_xlat1.x = u_xlatb1 ? 1.0 : float(0.0);
    u_xlat0.x = u_xlat0.x * u_xlat1.x;
    u_xlat16_41 = (-u_xlat16_41) + 1.0;
    u_xlat16_41 = u_xlat16_41 + _Glossiness;
#ifdef UNITY_ADRENO_ES3
    u_xlat16_41 = min(max(u_xlat16_41, 0.0), 1.0);
#else
    u_xlat16_41 = clamp(u_xlat16_41, 0.0, 1.0);
#endif
    u_xlat16_24.xyz = vec3(u_xlat26) * _LightColor0.xyz;
    u_xlat1.xyz = u_xlat0.xxx * _LightColor0.xyz;
    u_xlat16_42 = (-u_xlat13) + 1.0;
    u_xlat16_48 = u_xlat16_42 * u_xlat16_42;
    u_xlat16_48 = u_xlat16_48 * u_xlat16_48;
    u_xlat16_42 = u_xlat16_42 * u_xlat16_48;
    u_xlat16_12.xyz = (-u_xlat16_2.xyz) + vec3(1.0, 1.0, 1.0);
    u_xlat16_12.xyz = u_xlat16_12.xyz * vec3(u_xlat16_42) + u_xlat16_2.xyz;
    u_xlat0.xyz = u_xlat1.xyz * u_xlat16_12.xyz;
    u_xlat0.xyz = u_xlat16_3.xyz * u_xlat16_24.xyz + u_xlat0.xyz;
    u_xlat16_3.xyz = u_xlat16_9.xyz * vec3(u_xlat39);
    u_xlat16_9.xyz = (-u_xlat16_2.xyz) + vec3(u_xlat16_41);
    u_xlat16_2.xyz = u_xlat16_11.xxx * u_xlat16_9.xyz + u_xlat16_2.xyz;
    u_xlat0.xyz = u_xlat16_3.xyz * u_xlat16_2.xyz + u_xlat0.xyz;
    SV_Target0.xyz = u_xlat0.xyz;
    SV_Target0.w = 1.0;
    return;
}

