#version 300 es
#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
#endif

precision highp float;
precision highp int;
uniform 	vec3 _WorldSpaceCameraPos;
uniform 	mediump vec4 _WorldSpaceLightPos0;
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
uniform 	mediump vec4 _Color;
uniform 	mediump float _Metallic;
uniform 	float _Glossiness;
uniform 	mediump float _OcclusionStrength;
uniform 	mediump vec4 _EmissionColor;
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _ShadowMapTexture;
uniform mediump sampler2D _OcclusionMap;
uniform mediump sampler2D _EmissionMap;
uniform mediump samplerCube unity_SpecCube0;
uniform mediump samplerCube unity_SpecCube1;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD4;
in highp vec4 vs_TEXCOORD7;
in highp vec3 vs_TEXCOORD8;
layout(location = 0) out mediump vec4 SV_Target0;
vec3 u_xlat0;
mediump vec3 u_xlat16_0;
vec3 u_xlat1;
mediump vec3 u_xlat16_1;
bool u_xlatb1;
mediump vec3 u_xlat16_2;
mediump vec3 u_xlat16_3;
vec3 u_xlat4;
mediump vec4 u_xlat16_4;
bool u_xlatb4;
vec3 u_xlat5;
mediump vec4 u_xlat16_5;
mediump vec3 u_xlat16_6;
mediump vec3 u_xlat16_7;
vec3 u_xlat8;
vec3 u_xlat9;
bvec3 u_xlatb9;
vec3 u_xlat10;
mediump vec3 u_xlat16_10;
bvec3 u_xlatb11;
float u_xlat12;
float u_xlat13;
mediump vec3 u_xlat16_18;
float u_xlat24;
float u_xlat25;
float u_xlat36;
float u_xlat37;
mediump float u_xlat16_37;
mediump float u_xlat16_38;
mediump float u_xlat16_39;
float u_xlat40;
mediump float u_xlat16_40;
bool u_xlatb40;
mediump float u_xlat16_42;
mediump float u_xlat16_43;
void main()
{
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_1.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_2.xyz = _Color.xyz * u_xlat16_0.xyz + vec3(-0.220916301, -0.220916301, -0.220916301);
    u_xlat16_2.xyz = vec3(vec3(_Metallic, _Metallic, _Metallic)) * u_xlat16_2.xyz + vec3(0.220916301, 0.220916301, 0.220916301);
    u_xlat16_38 = (-_Metallic) * 0.779083729 + 0.779083729;
    u_xlat16_3.xyz = u_xlat16_1.xyz * vec3(u_xlat16_38);
    u_xlat0.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat0.x = inversesqrt(u_xlat0.x);
    u_xlat0.xyz = u_xlat0.xxx * vs_TEXCOORD4.xyz;
    u_xlat36 = dot(vs_TEXCOORD1.xyz, vs_TEXCOORD1.xyz);
    u_xlat36 = inversesqrt(u_xlat36);
    u_xlat1.xyz = vec3(u_xlat36) * vs_TEXCOORD1.xyz;
    u_xlat4.xyz = (-vs_TEXCOORD8.xyz) + _WorldSpaceCameraPos.xyz;
    u_xlat5.x = hlslcc_mtx4x4unity_MatrixV[0].z;
    u_xlat5.y = hlslcc_mtx4x4unity_MatrixV[1].z;
    u_xlat5.z = hlslcc_mtx4x4unity_MatrixV[2].z;
    u_xlat37 = dot(u_xlat4.xyz, u_xlat5.xyz);
    u_xlat4.xyz = vs_TEXCOORD8.xyz + (-unity_ShadowFadeCenterAndType.xyz);
    u_xlat4.x = dot(u_xlat4.xyz, u_xlat4.xyz);
    u_xlat4.x = sqrt(u_xlat4.x);
    u_xlat4.x = (-u_xlat37) + u_xlat4.x;
    u_xlat37 = unity_ShadowFadeCenterAndType.w * u_xlat4.x + u_xlat37;
    u_xlat37 = u_xlat37 * _LightShadowData.z + _LightShadowData.w;
#ifdef UNITY_ADRENO_ES3
    u_xlat37 = min(max(u_xlat37, 0.0), 1.0);
#else
    u_xlat37 = clamp(u_xlat37, 0.0, 1.0);
#endif
    u_xlat4.xy = vs_TEXCOORD7.xy / vs_TEXCOORD7.ww;
    u_xlat16_4.x = texture(_ShadowMapTexture, u_xlat4.xy).x;
    u_xlat16_39 = (-u_xlat16_4.x) + 1.0;
    u_xlat16_39 = u_xlat37 * u_xlat16_39 + u_xlat16_4.x;
    u_xlat16_37 = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_6.x = (-_OcclusionStrength) + 1.0;
    u_xlat16_6.x = u_xlat16_37 * _OcclusionStrength + u_xlat16_6.x;
    u_xlat37 = (-_Glossiness) + 1.0;
    u_xlat16_18.x = dot(u_xlat1.xyz, u_xlat0.xyz);
    u_xlat16_18.x = u_xlat16_18.x + u_xlat16_18.x;
    u_xlat16_18.xyz = u_xlat0.xyz * (-u_xlat16_18.xxx) + u_xlat1.xyz;
    u_xlat16_7.xyz = vec3(u_xlat16_39) * _LightColor0.xyz;
#ifdef UNITY_ADRENO_ES3
    u_xlatb4 = !!(0.0<unity_SpecCube0_ProbePosition.w);
#else
    u_xlatb4 = 0.0<unity_SpecCube0_ProbePosition.w;
#endif
    if(u_xlatb4){
        u_xlat16_4.x = dot(u_xlat16_18.xyz, u_xlat16_18.xyz);
        u_xlat16_4.x = inversesqrt(u_xlat16_4.x);
        u_xlat4.xyz = u_xlat16_4.xxx * u_xlat16_18.xyz;
        u_xlat5.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMax.xyz;
        u_xlat5.xyz = u_xlat5.xyz / u_xlat4.xyz;
        u_xlat8.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMin.xyz;
        u_xlat8.xyz = u_xlat8.xyz / u_xlat4.xyz;
        u_xlatb9.xyz = lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat4.xyzx).xyz;
        {
            vec3 hlslcc_movcTemp = u_xlat5;
            hlslcc_movcTemp.x = (u_xlatb9.x) ? u_xlat5.x : u_xlat8.x;
            hlslcc_movcTemp.y = (u_xlatb9.y) ? u_xlat5.y : u_xlat8.y;
            hlslcc_movcTemp.z = (u_xlatb9.z) ? u_xlat5.z : u_xlat8.z;
            u_xlat5 = hlslcc_movcTemp;
        }
        u_xlat40 = min(u_xlat5.y, u_xlat5.x);
        u_xlat40 = min(u_xlat5.z, u_xlat40);
        u_xlat5.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube0_ProbePosition.xyz);
        u_xlat4.xyz = u_xlat4.xyz * vec3(u_xlat40) + u_xlat5.xyz;
    } else {
        u_xlat4.xyz = u_xlat16_18.xyz;
    //ENDIF
    }
    u_xlat16_39 = (-u_xlat37) * 0.699999988 + 1.70000005;
    u_xlat16_39 = u_xlat37 * u_xlat16_39;
    u_xlat16_39 = u_xlat16_39 * 6.0;
    u_xlat16_4 = textureLod(unity_SpecCube0, u_xlat4.xyz, u_xlat16_39);
    u_xlat16_43 = u_xlat16_4.w + -1.0;
    u_xlat16_43 = unity_SpecCube0_HDR.w * u_xlat16_43 + 1.0;
    u_xlat16_43 = u_xlat16_43 * unity_SpecCube0_HDR.x;
    u_xlat16_10.xyz = u_xlat16_4.xyz * vec3(u_xlat16_43);
#ifdef UNITY_ADRENO_ES3
    u_xlatb40 = !!(unity_SpecCube0_BoxMin.w<0.999989986);
#else
    u_xlatb40 = unity_SpecCube0_BoxMin.w<0.999989986;
#endif
    if(u_xlatb40){
#ifdef UNITY_ADRENO_ES3
        u_xlatb40 = !!(0.0<unity_SpecCube1_ProbePosition.w);
#else
        u_xlatb40 = 0.0<unity_SpecCube1_ProbePosition.w;
#endif
        if(u_xlatb40){
            u_xlat16_40 = dot(u_xlat16_18.xyz, u_xlat16_18.xyz);
            u_xlat16_40 = inversesqrt(u_xlat16_40);
            u_xlat5.xyz = vec3(u_xlat16_40) * u_xlat16_18.xyz;
            u_xlat8.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube1_BoxMax.xyz;
            u_xlat8.xyz = u_xlat8.xyz / u_xlat5.xyz;
            u_xlat9.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube1_BoxMin.xyz;
            u_xlat9.xyz = u_xlat9.xyz / u_xlat5.xyz;
            u_xlatb11.xyz = lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat5.xyzx).xyz;
            {
                vec3 hlslcc_movcTemp = u_xlat8;
                hlslcc_movcTemp.x = (u_xlatb11.x) ? u_xlat8.x : u_xlat9.x;
                hlslcc_movcTemp.y = (u_xlatb11.y) ? u_xlat8.y : u_xlat9.y;
                hlslcc_movcTemp.z = (u_xlatb11.z) ? u_xlat8.z : u_xlat9.z;
                u_xlat8 = hlslcc_movcTemp;
            }
            u_xlat40 = min(u_xlat8.y, u_xlat8.x);
            u_xlat40 = min(u_xlat8.z, u_xlat40);
            u_xlat8.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube1_ProbePosition.xyz);
            u_xlat5.xyz = u_xlat5.xyz * vec3(u_xlat40) + u_xlat8.xyz;
        } else {
            u_xlat5.xyz = u_xlat16_18.xyz;
        //ENDIF
        }
        u_xlat16_5 = textureLod(unity_SpecCube1, u_xlat5.xyz, u_xlat16_39);
        u_xlat16_39 = u_xlat16_5.w + -1.0;
        u_xlat16_39 = unity_SpecCube1_HDR.w * u_xlat16_39 + 1.0;
        u_xlat16_39 = u_xlat16_39 * unity_SpecCube1_HDR.x;
        u_xlat16_18.xyz = u_xlat16_5.xyz * vec3(u_xlat16_39);
        u_xlat16_4.xyz = vec3(u_xlat16_43) * u_xlat16_4.xyz + (-u_xlat16_18.xyz);
        u_xlat10.xyz = unity_SpecCube0_BoxMin.www * u_xlat16_4.xyz + u_xlat16_18.xyz;
        u_xlat16_10.xyz = u_xlat10.xyz;
    //ENDIF
    }
    u_xlat16_6.xyz = u_xlat16_6.xxx * u_xlat16_10.xyz;
    u_xlat4.xyz = (-vs_TEXCOORD1.xyz) * vec3(u_xlat36) + _WorldSpaceLightPos0.xyz;
    u_xlat36 = dot(u_xlat4.xyz, u_xlat4.xyz);
    u_xlat36 = max(u_xlat36, 0.00100000005);
    u_xlat36 = inversesqrt(u_xlat36);
    u_xlat4.xyz = vec3(u_xlat36) * u_xlat4.xyz;
    u_xlat36 = dot(u_xlat0.xyz, (-u_xlat1.xyz));
    u_xlat1.x = dot(u_xlat0.xyz, _WorldSpaceLightPos0.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat1.x = min(max(u_xlat1.x, 0.0), 1.0);
#else
    u_xlat1.x = clamp(u_xlat1.x, 0.0, 1.0);
#endif
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat4.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat12 = dot(_WorldSpaceLightPos0.xyz, u_xlat4.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat12 = min(max(u_xlat12, 0.0), 1.0);
#else
    u_xlat12 = clamp(u_xlat12, 0.0, 1.0);
#endif
    u_xlat16_39 = u_xlat12 + u_xlat12;
    u_xlat16_39 = u_xlat12 * u_xlat16_39;
    u_xlat16_39 = u_xlat16_39 * u_xlat37 + -0.5;
    u_xlat16_42 = (-u_xlat1.x) + 1.0;
    u_xlat16_43 = u_xlat16_42 * u_xlat16_42;
    u_xlat16_43 = u_xlat16_43 * u_xlat16_43;
    u_xlat16_42 = u_xlat16_42 * u_xlat16_43;
    u_xlat16_42 = u_xlat16_39 * u_xlat16_42 + 1.0;
    u_xlat16_43 = -abs(u_xlat36) + 1.0;
    u_xlat16_10.x = u_xlat16_43 * u_xlat16_43;
    u_xlat16_10.x = u_xlat16_10.x * u_xlat16_10.x;
    u_xlat16_43 = u_xlat16_43 * u_xlat16_10.x;
    u_xlat16_39 = u_xlat16_39 * u_xlat16_43 + 1.0;
    u_xlat16_39 = u_xlat16_39 * u_xlat16_42;
    u_xlat24 = u_xlat1.x * u_xlat16_39;
    u_xlat13 = u_xlat37 * u_xlat37;
    u_xlat13 = max(u_xlat13, 0.00200000009);
    u_xlat25 = (-u_xlat13) + 1.0;
    u_xlat4.x = abs(u_xlat36) * u_xlat25 + u_xlat13;
    u_xlat25 = u_xlat1.x * u_xlat25 + u_xlat13;
    u_xlat36 = abs(u_xlat36) * u_xlat25;
    u_xlat36 = u_xlat1.x * u_xlat4.x + u_xlat36;
    u_xlat36 = u_xlat36 + 9.99999975e-06;
    u_xlat36 = 0.5 / u_xlat36;
    u_xlat25 = u_xlat13 * u_xlat13;
    u_xlat4.x = u_xlat0.x * u_xlat25 + (-u_xlat0.x);
    u_xlat0.x = u_xlat4.x * u_xlat0.x + 1.0;
    u_xlat25 = u_xlat25 * 0.318309873;
    u_xlat0.x = u_xlat0.x * u_xlat0.x + 1.00000001e-07;
    u_xlat0.x = u_xlat25 / u_xlat0.x;
    u_xlat0.x = u_xlat0.x * u_xlat36;
    u_xlat0.x = u_xlat0.x * 3.14159274;
    u_xlat0.x = max(u_xlat0.x, 9.99999975e-05);
    u_xlat0.x = sqrt(u_xlat0.x);
    u_xlat0.x = u_xlat1.x * u_xlat0.x;
    u_xlat36 = u_xlat13 * u_xlat37;
    u_xlat36 = (-u_xlat36) * 0.280000001 + 1.0;
    u_xlat16_39 = dot(u_xlat16_2.xyz, u_xlat16_2.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlatb1 = !!(u_xlat16_39!=0.0);
#else
    u_xlatb1 = u_xlat16_39!=0.0;
#endif
    u_xlat1.x = u_xlatb1 ? 1.0 : float(0.0);
    u_xlat0.x = u_xlat0.x * u_xlat1.x;
    u_xlat16_38 = (-u_xlat16_38) + 1.0;
    u_xlat16_38 = u_xlat16_38 + _Glossiness;
#ifdef UNITY_ADRENO_ES3
    u_xlat16_38 = min(max(u_xlat16_38, 0.0), 1.0);
#else
    u_xlat16_38 = clamp(u_xlat16_38, 0.0, 1.0);
#endif
    u_xlat16_10.xyz = vec3(u_xlat24) * u_xlat16_7.xyz;
    u_xlat1.xyz = u_xlat16_7.xyz * u_xlat0.xxx;
    u_xlat16_39 = (-u_xlat12) + 1.0;
    u_xlat16_42 = u_xlat16_39 * u_xlat16_39;
    u_xlat16_42 = u_xlat16_42 * u_xlat16_42;
    u_xlat16_39 = u_xlat16_39 * u_xlat16_42;
    u_xlat16_7.xyz = (-u_xlat16_2.xyz) + vec3(1.0, 1.0, 1.0);
    u_xlat16_7.xyz = u_xlat16_7.xyz * vec3(u_xlat16_39) + u_xlat16_2.xyz;
    u_xlat0.xyz = u_xlat1.xyz * u_xlat16_7.xyz;
    u_xlat0.xyz = u_xlat16_3.xyz * u_xlat16_10.xyz + u_xlat0.xyz;
    u_xlat16_3.xyz = u_xlat16_6.xyz * vec3(u_xlat36);
    u_xlat16_6.xyz = (-u_xlat16_2.xyz) + vec3(u_xlat16_38);
    u_xlat16_2.xyz = vec3(u_xlat16_43) * u_xlat16_6.xyz + u_xlat16_2.xyz;
    u_xlat0.xyz = u_xlat16_3.xyz * u_xlat16_2.xyz + u_xlat0.xyz;
    u_xlat16_1.xyz = texture(_EmissionMap, vs_TEXCOORD0.xy).xyz;
    SV_Target0.xyz = u_xlat16_1.xyz * _EmissionColor.xyz + u_xlat0.xyz;
    SV_Target0.w = 1.0;
    return;
}

