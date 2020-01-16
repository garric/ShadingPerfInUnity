#version 300 es
#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
#endif

precision highp float;
precision highp int;
uniform 	vec3 _WorldSpaceCameraPos;
uniform 	mediump vec4 _WorldSpaceLightPos0;
uniform 	mediump vec4 unity_SHAr;
uniform 	mediump vec4 unity_SHAg;
uniform 	mediump vec4 unity_SHAb;
uniform 	mediump vec4 _LightShadowData;
uniform 	vec4 unity_ShadowFadeCenterAndType;
uniform 	vec4 hlslcc_mtx4x4unity_MatrixV[4];
uniform 	vec4 unity_SpecCube0_BoxMax;
uniform 	vec4 unity_SpecCube0_BoxMin;
uniform 	vec4 unity_SpecCube0_ProbePosition;
uniform 	mediump vec4 unity_SpecCube0_HDR;
uniform 	vec4 unity_SpecCube1_BoxMax;
uniform 	vec4 unity_SpecCube1_BoxMin;
uniform 	vec4 unity_SpecCube1_ProbePosition;
uniform 	mediump vec4 unity_SpecCube1_HDR;
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _SpecColor;
uniform 	mediump vec4 _Color;
uniform 	mediump float _BumpScale;
uniform 	float _Glossiness;
uniform 	mediump float _OcclusionStrength;
uniform 	mediump vec4 _EmissionColor;
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _BumpMap;
uniform mediump sampler2D _ShadowMapTexture;
uniform mediump sampler2D _OcclusionMap;
uniform mediump sampler2D _EmissionMap;
uniform mediump samplerCube unity_SpecCube0;
uniform mediump samplerCube unity_SpecCube1;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD2;
in highp vec4 vs_TEXCOORD3;
in highp vec4 vs_TEXCOORD4;
in mediump vec4 vs_TEXCOORD5;
in highp vec4 vs_TEXCOORD7;
in highp vec3 vs_TEXCOORD8;
layout(location = 0) out mediump vec4 SV_Target0;
vec4 u_xlat0;
mediump vec3 u_xlat16_0;
mediump float u_xlat16_1;
mediump vec4 u_xlat16_2;
mediump vec4 u_xlat16_3;
vec3 u_xlat4;
mediump vec3 u_xlat16_4;
bool u_xlatb4;
vec3 u_xlat5;
mediump float u_xlat16_5;
vec3 u_xlat6;
mediump vec4 u_xlat16_6;
mediump vec3 u_xlat16_7;
vec3 u_xlat8;
vec3 u_xlat9;
vec3 u_xlat10;
bvec3 u_xlatb10;
bvec3 u_xlatb11;
mediump vec4 u_xlat16_12;
float u_xlat13;
mediump vec3 u_xlat16_14;
mediump vec3 u_xlat16_15;
vec3 u_xlat17;
vec3 u_xlat18;
mediump vec3 u_xlat16_18;
vec3 u_xlat20;
mediump vec3 u_xlat16_20;
mediump float u_xlat16_25;
float u_xlat26;
mediump float u_xlat16_28;
float u_xlat30;
mediump float u_xlat16_38;
float u_xlat39;
mediump float u_xlat16_39;
bool u_xlatb39;
mediump float u_xlat16_42;
float u_xlat43;
mediump float u_xlat16_46;
void main()
{
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_0.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_1 = max(_SpecColor.y, _SpecColor.x);
    u_xlat16_1 = max(u_xlat16_1, _SpecColor.z);
    u_xlat16_1 = (-u_xlat16_1) + 1.0;
    u_xlat16_14.xyz = u_xlat16_0.xyz * vec3(u_xlat16_1);
    u_xlat16_0.xyz = texture(_BumpMap, vs_TEXCOORD0.xy).xyz;
    u_xlat16_2.xyz = u_xlat16_0.xyz * vec3(2.0, 2.0, 2.0) + vec3(-1.0, -1.0, -1.0);
    u_xlat16_2.xy = u_xlat16_2.xy * vec2(_BumpScale);
    u_xlat16_3.xyz = u_xlat16_2.yyy * vs_TEXCOORD3.xyz;
    u_xlat16_2.xyw = vs_TEXCOORD2.xyz * u_xlat16_2.xxx + u_xlat16_3.xyz;
    u_xlat16_2.xyz = vs_TEXCOORD4.xyz * u_xlat16_2.zzz + u_xlat16_2.xyw;
    u_xlat16_0.x = dot(u_xlat16_2.xyz, u_xlat16_2.xyz);
    u_xlat16_0.x = inversesqrt(u_xlat16_0.x);
    u_xlat0.xyz = u_xlat16_0.xxx * u_xlat16_2.xyz;
    u_xlat4.x = dot(vs_TEXCOORD1.xyz, vs_TEXCOORD1.xyz);
    u_xlat4.x = inversesqrt(u_xlat4.x);
    u_xlat17.xyz = u_xlat4.xxx * vs_TEXCOORD1.xyz;
    u_xlat5.xyz = (-vs_TEXCOORD8.xyz) + _WorldSpaceCameraPos.xyz;
    u_xlat6.x = hlslcc_mtx4x4unity_MatrixV[0].z;
    u_xlat6.y = hlslcc_mtx4x4unity_MatrixV[1].z;
    u_xlat6.z = hlslcc_mtx4x4unity_MatrixV[2].z;
    u_xlat5.x = dot(u_xlat5.xyz, u_xlat6.xyz);
    u_xlat18.xyz = vs_TEXCOORD8.xyz + (-unity_ShadowFadeCenterAndType.xyz);
    u_xlat18.x = dot(u_xlat18.xyz, u_xlat18.xyz);
    u_xlat18.x = sqrt(u_xlat18.x);
    u_xlat18.x = (-u_xlat5.x) + u_xlat18.x;
    u_xlat5.x = unity_ShadowFadeCenterAndType.w * u_xlat18.x + u_xlat5.x;
    u_xlat5.x = u_xlat5.x * _LightShadowData.z + _LightShadowData.w;
#ifdef UNITY_ADRENO_ES3
    u_xlat5.x = min(max(u_xlat5.x, 0.0), 1.0);
#else
    u_xlat5.x = clamp(u_xlat5.x, 0.0, 1.0);
#endif
    u_xlat18.xy = vs_TEXCOORD7.xy / vs_TEXCOORD7.ww;
    u_xlat16_18.x = texture(_ShadowMapTexture, u_xlat18.xy).x;
    u_xlat16_2.x = (-u_xlat16_18.x) + 1.0;
    u_xlat16_2.x = u_xlat5.x * u_xlat16_2.x + u_xlat16_18.x;
    u_xlat16_5 = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_15.x = (-_OcclusionStrength) + 1.0;
    u_xlat16_15.x = u_xlat16_5 * _OcclusionStrength + u_xlat16_15.x;
    u_xlat5.x = (-_Glossiness) + 1.0;
    u_xlat16_28 = dot(u_xlat17.xyz, u_xlat0.xyz);
    u_xlat16_28 = u_xlat16_28 + u_xlat16_28;
    u_xlat16_3.xyz = u_xlat0.xyz * (-vec3(u_xlat16_28)) + u_xlat17.xyz;
    u_xlat16_2.xzw = u_xlat16_2.xxx * _LightColor0.xyz;
    u_xlat0.w = 1.0;
    u_xlat16_7.x = dot(unity_SHAr, u_xlat0);
    u_xlat16_7.y = dot(unity_SHAg, u_xlat0);
    u_xlat16_7.z = dot(unity_SHAb, u_xlat0);
    u_xlat16_7.xyz = u_xlat16_7.xyz + vs_TEXCOORD5.xyz;
    u_xlat16_7.xyz = max(u_xlat16_7.xyz, vec3(0.0, 0.0, 0.0));
    u_xlat16_18.xyz = log2(u_xlat16_7.xyz);
    u_xlat16_18.xyz = u_xlat16_18.xyz * vec3(0.416666657, 0.416666657, 0.416666657);
    u_xlat16_18.xyz = exp2(u_xlat16_18.xyz);
    u_xlat16_18.xyz = u_xlat16_18.xyz * vec3(1.05499995, 1.05499995, 1.05499995) + vec3(-0.0549999997, -0.0549999997, -0.0549999997);
    u_xlat16_18.xyz = max(u_xlat16_18.xyz, vec3(0.0, 0.0, 0.0));
#ifdef UNITY_ADRENO_ES3
    u_xlatb39 = !!(0.0<unity_SpecCube0_ProbePosition.w);
#else
    u_xlatb39 = 0.0<unity_SpecCube0_ProbePosition.w;
#endif
    if(u_xlatb39){
        u_xlat16_39 = dot(u_xlat16_3.xyz, u_xlat16_3.xyz);
        u_xlat16_39 = inversesqrt(u_xlat16_39);
        u_xlat6.xyz = vec3(u_xlat16_39) * u_xlat16_3.xyz;
        u_xlat8.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMax.xyz;
        u_xlat8.xyz = u_xlat8.xyz / u_xlat6.xyz;
        u_xlat9.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMin.xyz;
        u_xlat9.xyz = u_xlat9.xyz / u_xlat6.xyz;
        u_xlatb10.xyz = lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat6.xyzx).xyz;
        {
            vec3 hlslcc_movcTemp = u_xlat8;
            hlslcc_movcTemp.x = (u_xlatb10.x) ? u_xlat8.x : u_xlat9.x;
            hlslcc_movcTemp.y = (u_xlatb10.y) ? u_xlat8.y : u_xlat9.y;
            hlslcc_movcTemp.z = (u_xlatb10.z) ? u_xlat8.z : u_xlat9.z;
            u_xlat8 = hlslcc_movcTemp;
        }
        u_xlat39 = min(u_xlat8.y, u_xlat8.x);
        u_xlat39 = min(u_xlat8.z, u_xlat39);
        u_xlat8.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube0_ProbePosition.xyz);
        u_xlat6.xyz = u_xlat6.xyz * vec3(u_xlat39) + u_xlat8.xyz;
    } else {
        u_xlat6.xyz = u_xlat16_3.xyz;
    //ENDIF
    }
    u_xlat16_42 = (-u_xlat5.x) * 0.699999988 + 1.70000005;
    u_xlat16_42 = u_xlat16_42 * u_xlat5.x;
    u_xlat16_42 = u_xlat16_42 * 6.0;
    u_xlat16_6 = textureLod(unity_SpecCube0, u_xlat6.xyz, u_xlat16_42);
    u_xlat16_7.x = u_xlat16_6.w + -1.0;
    u_xlat16_7.x = unity_SpecCube0_HDR.w * u_xlat16_7.x + 1.0;
    u_xlat16_7.x = u_xlat16_7.x * unity_SpecCube0_HDR.x;
    u_xlat16_20.xyz = u_xlat16_6.xyz * u_xlat16_7.xxx;
#ifdef UNITY_ADRENO_ES3
    u_xlatb39 = !!(unity_SpecCube0_BoxMin.w<0.999989986);
#else
    u_xlatb39 = unity_SpecCube0_BoxMin.w<0.999989986;
#endif
    if(u_xlatb39){
#ifdef UNITY_ADRENO_ES3
        u_xlatb39 = !!(0.0<unity_SpecCube1_ProbePosition.w);
#else
        u_xlatb39 = 0.0<unity_SpecCube1_ProbePosition.w;
#endif
        if(u_xlatb39){
            u_xlat16_39 = dot(u_xlat16_3.xyz, u_xlat16_3.xyz);
            u_xlat16_39 = inversesqrt(u_xlat16_39);
            u_xlat8.xyz = vec3(u_xlat16_39) * u_xlat16_3.xyz;
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
            u_xlat39 = min(u_xlat9.y, u_xlat9.x);
            u_xlat39 = min(u_xlat9.z, u_xlat39);
            u_xlat9.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube1_ProbePosition.xyz);
            u_xlat8.xyz = u_xlat8.xyz * vec3(u_xlat39) + u_xlat9.xyz;
        } else {
            u_xlat8.xyz = u_xlat16_3.xyz;
        //ENDIF
        }
        u_xlat16_3 = textureLod(unity_SpecCube1, u_xlat8.xyz, u_xlat16_42);
        u_xlat16_12.x = u_xlat16_3.w + -1.0;
        u_xlat16_12.x = unity_SpecCube1_HDR.w * u_xlat16_12.x + 1.0;
        u_xlat16_12.x = u_xlat16_12.x * unity_SpecCube1_HDR.x;
        u_xlat16_12.xyz = u_xlat16_3.xyz * u_xlat16_12.xxx;
        u_xlat16_6.xyz = u_xlat16_7.xxx * u_xlat16_6.xyz + (-u_xlat16_12.xyz);
        u_xlat20.xyz = unity_SpecCube0_BoxMin.www * u_xlat16_6.xyz + u_xlat16_12.xyz;
        u_xlat16_20.xyz = u_xlat20.xyz;
    //ENDIF
    }
    u_xlat16_7.xyz = u_xlat16_15.xxx * u_xlat16_20.xyz;
    u_xlat6.xyz = (-vs_TEXCOORD1.xyz) * u_xlat4.xxx + _WorldSpaceLightPos0.xyz;
    u_xlat39 = dot(u_xlat6.xyz, u_xlat6.xyz);
    u_xlat39 = max(u_xlat39, 0.00100000005);
    u_xlat39 = inversesqrt(u_xlat39);
    u_xlat6.xyz = vec3(u_xlat39) * u_xlat6.xyz;
    u_xlat39 = dot(u_xlat0.xyz, (-u_xlat17.xyz));
    u_xlat4.x = dot(u_xlat0.xyz, _WorldSpaceLightPos0.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat4.x = min(max(u_xlat4.x, 0.0), 1.0);
#else
    u_xlat4.x = clamp(u_xlat4.x, 0.0, 1.0);
#endif
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat6.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat13 = dot(_WorldSpaceLightPos0.xyz, u_xlat6.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat13 = min(max(u_xlat13, 0.0), 1.0);
#else
    u_xlat13 = clamp(u_xlat13, 0.0, 1.0);
#endif
    u_xlat16_46 = u_xlat13 + u_xlat13;
    u_xlat16_46 = u_xlat13 * u_xlat16_46;
    u_xlat16_46 = u_xlat16_46 * u_xlat5.x + -0.5;
    u_xlat16_12.x = (-u_xlat4.x) + 1.0;
    u_xlat16_25 = u_xlat16_12.x * u_xlat16_12.x;
    u_xlat16_25 = u_xlat16_25 * u_xlat16_25;
    u_xlat16_12.x = u_xlat16_12.x * u_xlat16_25;
    u_xlat16_12.x = u_xlat16_46 * u_xlat16_12.x + 1.0;
    u_xlat16_25 = -abs(u_xlat39) + 1.0;
    u_xlat16_38 = u_xlat16_25 * u_xlat16_25;
    u_xlat16_38 = u_xlat16_38 * u_xlat16_38;
    u_xlat16_25 = u_xlat16_25 * u_xlat16_38;
    u_xlat16_46 = u_xlat16_46 * u_xlat16_25 + 1.0;
    u_xlat16_46 = u_xlat16_46 * u_xlat16_12.x;
    u_xlat26 = u_xlat4.x * u_xlat16_46;
    u_xlat17.x = u_xlat5.x * u_xlat5.x;
    u_xlat17.x = max(u_xlat17.x, 0.00200000009);
    u_xlat30 = (-u_xlat17.x) + 1.0;
    u_xlat43 = abs(u_xlat39) * u_xlat30 + u_xlat17.x;
    u_xlat30 = u_xlat4.x * u_xlat30 + u_xlat17.x;
    u_xlat39 = abs(u_xlat39) * u_xlat30;
    u_xlat39 = u_xlat4.x * u_xlat43 + u_xlat39;
    u_xlat39 = u_xlat39 + 9.99999975e-06;
    u_xlat39 = 0.5 / u_xlat39;
    u_xlat30 = u_xlat17.x * u_xlat17.x;
    u_xlat43 = u_xlat0.x * u_xlat30 + (-u_xlat0.x);
    u_xlat0.x = u_xlat43 * u_xlat0.x + 1.0;
    u_xlat30 = u_xlat30 * 0.318309873;
    u_xlat0.x = u_xlat0.x * u_xlat0.x + 1.00000001e-07;
    u_xlat0.x = u_xlat30 / u_xlat0.x;
    u_xlat0.x = u_xlat0.x * u_xlat39;
    u_xlat0.x = u_xlat0.x * 3.14159274;
    u_xlat0.x = max(u_xlat0.x, 9.99999975e-05);
    u_xlat0.x = sqrt(u_xlat0.x);
    u_xlat0.x = u_xlat4.x * u_xlat0.x;
    u_xlat39 = u_xlat17.x * u_xlat5.x;
    u_xlat39 = (-u_xlat39) * 0.280000001 + 1.0;
    u_xlat16_46 = dot(_SpecColor.xyz, _SpecColor.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlatb4 = !!(u_xlat16_46!=0.0);
#else
    u_xlatb4 = u_xlat16_46!=0.0;
#endif
    u_xlat4.x = u_xlatb4 ? 1.0 : float(0.0);
    u_xlat0.x = u_xlat0.x * u_xlat4.x;
    u_xlat16_1 = (-u_xlat16_1) + 1.0;
    u_xlat16_1 = u_xlat16_1 + _Glossiness;
#ifdef UNITY_ADRENO_ES3
    u_xlat16_1 = min(max(u_xlat16_1, 0.0), 1.0);
#else
    u_xlat16_1 = clamp(u_xlat16_1, 0.0, 1.0);
#endif
    u_xlat16_12.xzw = vec3(u_xlat26) * u_xlat16_2.xzw;
    u_xlat16_12.xzw = u_xlat16_18.xyz * u_xlat16_15.xxx + u_xlat16_12.xzw;
    u_xlat4.xyz = u_xlat16_2.xzw * u_xlat0.xxx;
    u_xlat16_2.x = (-u_xlat13) + 1.0;
    u_xlat16_15.x = u_xlat16_2.x * u_xlat16_2.x;
    u_xlat16_15.x = u_xlat16_15.x * u_xlat16_15.x;
    u_xlat16_2.x = u_xlat16_2.x * u_xlat16_15.x;
    u_xlat16_15.xyz = (-_SpecColor.xyz) + vec3(1.0, 1.0, 1.0);
    u_xlat16_2.xyz = u_xlat16_15.xyz * u_xlat16_2.xxx + _SpecColor.xyz;
    u_xlat0.xyz = u_xlat16_2.xyz * u_xlat4.xyz;
    u_xlat0.xyz = u_xlat16_14.xyz * u_xlat16_12.xzw + u_xlat0.xyz;
    u_xlat16_14.xyz = u_xlat16_7.xyz * vec3(u_xlat39);
    u_xlat16_2.xyz = vec3(u_xlat16_1) + (-_SpecColor.xyz);
    u_xlat16_2.xyz = vec3(u_xlat16_25) * u_xlat16_2.xyz + _SpecColor.xyz;
    u_xlat0.xyz = u_xlat16_14.xyz * u_xlat16_2.xyz + u_xlat0.xyz;
    u_xlat16_4.xyz = texture(_EmissionMap, vs_TEXCOORD0.xy).xyz;
    SV_Target0.xyz = u_xlat16_4.xyz * _EmissionColor.xyz + u_xlat0.xyz;
    SV_Target0.w = 1.0;
    return;
}

