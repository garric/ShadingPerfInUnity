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
uniform 	mediump vec4 _SpecColor;
uniform 	mediump vec4 _Color;
uniform 	float _Glossiness;
uniform 	mediump float _OcclusionStrength;
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _ShadowMapTexture;
uniform mediump sampler2D _OcclusionMap;
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
mediump float u_xlat16_1;
vec3 u_xlat2;
bool u_xlatb2;
vec3 u_xlat3;
mediump vec4 u_xlat16_3;
bool u_xlatb3;
vec3 u_xlat4;
mediump vec4 u_xlat16_4;
mediump vec4 u_xlat16_5;
mediump vec3 u_xlat16_6;
vec3 u_xlat7;
vec3 u_xlat8;
bvec3 u_xlatb8;
mediump float u_xlat16_9;
bvec3 u_xlatb10;
float u_xlat11;
mediump vec3 u_xlat16_12;
float u_xlat13;
mediump vec3 u_xlat16_16;
vec3 u_xlat20;
mediump vec3 u_xlat16_20;
float u_xlat22;
float u_xlat24;
mediump float u_xlat16_27;
float u_xlat33;
float u_xlat35;
mediump float u_xlat16_35;
float u_xlat36;
mediump float u_xlat16_36;
bool u_xlatb36;
mediump float u_xlat16_39;
void main()
{
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_0.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_1 = max(_SpecColor.y, _SpecColor.x);
    u_xlat16_1 = max(u_xlat16_1, _SpecColor.z);
    u_xlat16_1 = (-u_xlat16_1) + 1.0;
    u_xlat16_12.xyz = u_xlat16_0.xyz * vec3(u_xlat16_1);
    u_xlat0.x = dot(vs_TEXCOORD4.xyz, vs_TEXCOORD4.xyz);
    u_xlat0.x = inversesqrt(u_xlat0.x);
    u_xlat0.xyz = u_xlat0.xxx * vs_TEXCOORD4.xyz;
    u_xlat33 = dot(vs_TEXCOORD1.xyz, vs_TEXCOORD1.xyz);
    u_xlat33 = inversesqrt(u_xlat33);
    u_xlat2.xyz = vec3(u_xlat33) * vs_TEXCOORD1.xyz;
    u_xlat3.xyz = (-vs_TEXCOORD8.xyz) + _WorldSpaceCameraPos.xyz;
    u_xlat4.x = hlslcc_mtx4x4unity_MatrixV[0].z;
    u_xlat4.y = hlslcc_mtx4x4unity_MatrixV[1].z;
    u_xlat4.z = hlslcc_mtx4x4unity_MatrixV[2].z;
    u_xlat35 = dot(u_xlat3.xyz, u_xlat4.xyz);
    u_xlat3.xyz = vs_TEXCOORD8.xyz + (-unity_ShadowFadeCenterAndType.xyz);
    u_xlat3.x = dot(u_xlat3.xyz, u_xlat3.xyz);
    u_xlat3.x = sqrt(u_xlat3.x);
    u_xlat3.x = (-u_xlat35) + u_xlat3.x;
    u_xlat35 = unity_ShadowFadeCenterAndType.w * u_xlat3.x + u_xlat35;
    u_xlat35 = u_xlat35 * _LightShadowData.z + _LightShadowData.w;
#ifdef UNITY_ADRENO_ES3
    u_xlat35 = min(max(u_xlat35, 0.0), 1.0);
#else
    u_xlat35 = clamp(u_xlat35, 0.0, 1.0);
#endif
    u_xlat3.xy = vs_TEXCOORD7.xy / vs_TEXCOORD7.ww;
    u_xlat16_3.x = texture(_ShadowMapTexture, u_xlat3.xy).x;
    u_xlat16_5.x = (-u_xlat16_3.x) + 1.0;
    u_xlat16_5.x = u_xlat35 * u_xlat16_5.x + u_xlat16_3.x;
    u_xlat16_35 = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_16.x = (-_OcclusionStrength) + 1.0;
    u_xlat16_16.x = u_xlat16_35 * _OcclusionStrength + u_xlat16_16.x;
    u_xlat35 = (-_Glossiness) + 1.0;
    u_xlat16_27 = dot(u_xlat2.xyz, u_xlat0.xyz);
    u_xlat16_27 = u_xlat16_27 + u_xlat16_27;
    u_xlat16_6.xyz = u_xlat0.xyz * (-vec3(u_xlat16_27)) + u_xlat2.xyz;
    u_xlat16_5.xzw = u_xlat16_5.xxx * _LightColor0.xyz;
#ifdef UNITY_ADRENO_ES3
    u_xlatb3 = !!(0.0<unity_SpecCube0_ProbePosition.w);
#else
    u_xlatb3 = 0.0<unity_SpecCube0_ProbePosition.w;
#endif
    if(u_xlatb3){
        u_xlat16_3.x = dot(u_xlat16_6.xyz, u_xlat16_6.xyz);
        u_xlat16_3.x = inversesqrt(u_xlat16_3.x);
        u_xlat3.xyz = u_xlat16_3.xxx * u_xlat16_6.xyz;
        u_xlat4.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMax.xyz;
        u_xlat4.xyz = u_xlat4.xyz / u_xlat3.xyz;
        u_xlat7.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube0_BoxMin.xyz;
        u_xlat7.xyz = u_xlat7.xyz / u_xlat3.xyz;
        u_xlatb8.xyz = lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat3.xyzx).xyz;
        {
            vec3 hlslcc_movcTemp = u_xlat4;
            hlslcc_movcTemp.x = (u_xlatb8.x) ? u_xlat4.x : u_xlat7.x;
            hlslcc_movcTemp.y = (u_xlatb8.y) ? u_xlat4.y : u_xlat7.y;
            hlslcc_movcTemp.z = (u_xlatb8.z) ? u_xlat4.z : u_xlat7.z;
            u_xlat4 = hlslcc_movcTemp;
        }
        u_xlat36 = min(u_xlat4.y, u_xlat4.x);
        u_xlat36 = min(u_xlat4.z, u_xlat36);
        u_xlat4.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube0_ProbePosition.xyz);
        u_xlat3.xyz = u_xlat3.xyz * vec3(u_xlat36) + u_xlat4.xyz;
    } else {
        u_xlat3.xyz = u_xlat16_6.xyz;
    //ENDIF
    }
    u_xlat16_39 = (-u_xlat35) * 0.699999988 + 1.70000005;
    u_xlat16_39 = u_xlat35 * u_xlat16_39;
    u_xlat16_39 = u_xlat16_39 * 6.0;
    u_xlat16_3 = textureLod(unity_SpecCube0, u_xlat3.xyz, u_xlat16_39);
    u_xlat16_9 = u_xlat16_3.w + -1.0;
    u_xlat16_9 = unity_SpecCube0_HDR.w * u_xlat16_9 + 1.0;
    u_xlat16_9 = u_xlat16_9 * unity_SpecCube0_HDR.x;
    u_xlat16_20.xyz = u_xlat16_3.xyz * vec3(u_xlat16_9);
#ifdef UNITY_ADRENO_ES3
    u_xlatb36 = !!(unity_SpecCube0_BoxMin.w<0.999989986);
#else
    u_xlatb36 = unity_SpecCube0_BoxMin.w<0.999989986;
#endif
    if(u_xlatb36){
#ifdef UNITY_ADRENO_ES3
        u_xlatb36 = !!(0.0<unity_SpecCube1_ProbePosition.w);
#else
        u_xlatb36 = 0.0<unity_SpecCube1_ProbePosition.w;
#endif
        if(u_xlatb36){
            u_xlat16_36 = dot(u_xlat16_6.xyz, u_xlat16_6.xyz);
            u_xlat16_36 = inversesqrt(u_xlat16_36);
            u_xlat4.xyz = vec3(u_xlat16_36) * u_xlat16_6.xyz;
            u_xlat7.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube1_BoxMax.xyz;
            u_xlat7.xyz = u_xlat7.xyz / u_xlat4.xyz;
            u_xlat8.xyz = (-vs_TEXCOORD8.xyz) + unity_SpecCube1_BoxMin.xyz;
            u_xlat8.xyz = u_xlat8.xyz / u_xlat4.xyz;
            u_xlatb10.xyz = lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat4.xyzx).xyz;
            {
                vec3 hlslcc_movcTemp = u_xlat7;
                hlslcc_movcTemp.x = (u_xlatb10.x) ? u_xlat7.x : u_xlat8.x;
                hlslcc_movcTemp.y = (u_xlatb10.y) ? u_xlat7.y : u_xlat8.y;
                hlslcc_movcTemp.z = (u_xlatb10.z) ? u_xlat7.z : u_xlat8.z;
                u_xlat7 = hlslcc_movcTemp;
            }
            u_xlat36 = min(u_xlat7.y, u_xlat7.x);
            u_xlat36 = min(u_xlat7.z, u_xlat36);
            u_xlat7.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube1_ProbePosition.xyz);
            u_xlat4.xyz = u_xlat4.xyz * vec3(u_xlat36) + u_xlat7.xyz;
        } else {
            u_xlat4.xyz = u_xlat16_6.xyz;
        //ENDIF
        }
        u_xlat16_4 = textureLod(unity_SpecCube1, u_xlat4.xyz, u_xlat16_39);
        u_xlat16_6.x = u_xlat16_4.w + -1.0;
        u_xlat16_6.x = unity_SpecCube1_HDR.w * u_xlat16_6.x + 1.0;
        u_xlat16_6.x = u_xlat16_6.x * unity_SpecCube1_HDR.x;
        u_xlat16_6.xyz = u_xlat16_4.xyz * u_xlat16_6.xxx;
        u_xlat16_3.xyz = vec3(u_xlat16_9) * u_xlat16_3.xyz + (-u_xlat16_6.xyz);
        u_xlat20.xyz = unity_SpecCube0_BoxMin.www * u_xlat16_3.xyz + u_xlat16_6.xyz;
        u_xlat16_20.xyz = u_xlat20.xyz;
    //ENDIF
    }
    u_xlat16_6.xyz = u_xlat16_16.xxx * u_xlat16_20.xyz;
    u_xlat3.xyz = (-vs_TEXCOORD1.xyz) * vec3(u_xlat33) + _WorldSpaceLightPos0.xyz;
    u_xlat33 = dot(u_xlat3.xyz, u_xlat3.xyz);
    u_xlat33 = max(u_xlat33, 0.00100000005);
    u_xlat33 = inversesqrt(u_xlat33);
    u_xlat3.xyz = vec3(u_xlat33) * u_xlat3.xyz;
    u_xlat33 = dot(u_xlat0.xyz, (-u_xlat2.xyz));
    u_xlat2.x = dot(u_xlat0.xyz, _WorldSpaceLightPos0.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat2.x = min(max(u_xlat2.x, 0.0), 1.0);
#else
    u_xlat2.x = clamp(u_xlat2.x, 0.0, 1.0);
#endif
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat3.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat11 = dot(_WorldSpaceLightPos0.xyz, u_xlat3.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat11 = min(max(u_xlat11, 0.0), 1.0);
#else
    u_xlat11 = clamp(u_xlat11, 0.0, 1.0);
#endif
    u_xlat16_16.x = u_xlat11 + u_xlat11;
    u_xlat16_16.x = u_xlat11 * u_xlat16_16.x;
    u_xlat16_16.x = u_xlat16_16.x * u_xlat35 + -0.5;
    u_xlat16_39 = (-u_xlat2.x) + 1.0;
    u_xlat16_9 = u_xlat16_39 * u_xlat16_39;
    u_xlat16_9 = u_xlat16_9 * u_xlat16_9;
    u_xlat16_39 = u_xlat16_39 * u_xlat16_9;
    u_xlat16_39 = u_xlat16_16.x * u_xlat16_39 + 1.0;
    u_xlat16_9 = -abs(u_xlat33) + 1.0;
    u_xlat16_20.x = u_xlat16_9 * u_xlat16_9;
    u_xlat16_20.x = u_xlat16_20.x * u_xlat16_20.x;
    u_xlat16_9 = u_xlat16_9 * u_xlat16_20.x;
    u_xlat16_16.x = u_xlat16_16.x * u_xlat16_9 + 1.0;
    u_xlat16_16.x = u_xlat16_16.x * u_xlat16_39;
    u_xlat22 = u_xlat2.x * u_xlat16_16.x;
    u_xlat13 = u_xlat35 * u_xlat35;
    u_xlat13 = max(u_xlat13, 0.00200000009);
    u_xlat24 = (-u_xlat13) + 1.0;
    u_xlat3.x = abs(u_xlat33) * u_xlat24 + u_xlat13;
    u_xlat24 = u_xlat2.x * u_xlat24 + u_xlat13;
    u_xlat33 = abs(u_xlat33) * u_xlat24;
    u_xlat33 = u_xlat2.x * u_xlat3.x + u_xlat33;
    u_xlat33 = u_xlat33 + 9.99999975e-06;
    u_xlat33 = 0.5 / u_xlat33;
    u_xlat24 = u_xlat13 * u_xlat13;
    u_xlat3.x = u_xlat0.x * u_xlat24 + (-u_xlat0.x);
    u_xlat0.x = u_xlat3.x * u_xlat0.x + 1.0;
    u_xlat24 = u_xlat24 * 0.318309873;
    u_xlat0.x = u_xlat0.x * u_xlat0.x + 1.00000001e-07;
    u_xlat0.x = u_xlat24 / u_xlat0.x;
    u_xlat0.x = u_xlat0.x * u_xlat33;
    u_xlat0.x = u_xlat0.x * 3.14159274;
    u_xlat0.x = max(u_xlat0.x, 9.99999975e-05);
    u_xlat0.x = sqrt(u_xlat0.x);
    u_xlat0.x = u_xlat2.x * u_xlat0.x;
    u_xlat33 = u_xlat13 * u_xlat35;
    u_xlat33 = (-u_xlat33) * 0.280000001 + 1.0;
    u_xlat16_16.x = dot(_SpecColor.xyz, _SpecColor.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlatb2 = !!(u_xlat16_16.x!=0.0);
#else
    u_xlatb2 = u_xlat16_16.x!=0.0;
#endif
    u_xlat2.x = u_xlatb2 ? 1.0 : float(0.0);
    u_xlat0.x = u_xlat0.x * u_xlat2.x;
    u_xlat16_1 = (-u_xlat16_1) + 1.0;
    u_xlat16_1 = u_xlat16_1 + _Glossiness;
#ifdef UNITY_ADRENO_ES3
    u_xlat16_1 = min(max(u_xlat16_1, 0.0), 1.0);
#else
    u_xlat16_1 = clamp(u_xlat16_1, 0.0, 1.0);
#endif
    u_xlat16_20.xyz = vec3(u_xlat22) * u_xlat16_5.xzw;
    u_xlat2.xyz = u_xlat16_5.xzw * u_xlat0.xxx;
    u_xlat16_5.x = (-u_xlat11) + 1.0;
    u_xlat16_16.x = u_xlat16_5.x * u_xlat16_5.x;
    u_xlat16_16.x = u_xlat16_16.x * u_xlat16_16.x;
    u_xlat16_5.x = u_xlat16_5.x * u_xlat16_16.x;
    u_xlat16_16.xyz = (-_SpecColor.xyz) + vec3(1.0, 1.0, 1.0);
    u_xlat16_5.xyz = u_xlat16_16.xyz * u_xlat16_5.xxx + _SpecColor.xyz;
    u_xlat0.xyz = u_xlat2.xyz * u_xlat16_5.xyz;
    u_xlat0.xyz = u_xlat16_12.xyz * u_xlat16_20.xyz + u_xlat0.xyz;
    u_xlat16_12.xyz = u_xlat16_6.xyz * vec3(u_xlat33);
    u_xlat16_5.xyz = vec3(u_xlat16_1) + (-_SpecColor.xyz);
    u_xlat16_5.xyz = vec3(u_xlat16_9) * u_xlat16_5.xyz + _SpecColor.xyz;
    u_xlat0.xyz = u_xlat16_12.xyz * u_xlat16_5.xyz + u_xlat0.xyz;
    SV_Target0.xyz = u_xlat0.xyz;
    SV_Target0.w = 1.0;
    return;
}

