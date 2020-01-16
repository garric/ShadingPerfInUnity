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
in highp vec4 vs_TEXCOORD7;
in highp vec3 vs_TEXCOORD8;
layout(location = 0) out mediump vec4 SV_Target0;
vec3 u_xlat0;
mediump vec3 u_xlat16_0;
mediump float u_xlat16_1;
mediump vec4 u_xlat16_2;
mediump vec4 u_xlat16_3;
vec3 u_xlat4;
mediump vec3 u_xlat16_4;
bool u_xlatb4;
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
float u_xlat12;
mediump vec3 u_xlat16_13;
mediump vec3 u_xlat16_14;
float u_xlat16;
vec3 u_xlat21;
mediump vec3 u_xlat16_21;
mediump vec3 u_xlat16_23;
mediump float u_xlat16_24;
mediump float u_xlat16_26;
float u_xlat28;
float u_xlat36;
mediump float u_xlat16_39;
float u_xlat40;
mediump float u_xlat16_40;
float u_xlat41;
mediump float u_xlat16_41;
bool u_xlatb41;
mediump float u_xlat16_45;
void main()
{
    u_xlat16_0.xyz = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_0.xyz = u_xlat16_0.xyz * _Color.xyz;
    u_xlat16_1 = max(_SpecColor.y, _SpecColor.x);
    u_xlat16_1 = max(u_xlat16_1, _SpecColor.z);
    u_xlat16_1 = (-u_xlat16_1) + 1.0;
    u_xlat16_13.xyz = u_xlat16_0.xyz * vec3(u_xlat16_1);
    u_xlat16_0.xyz = texture(_BumpMap, vs_TEXCOORD0.xy).xyz;
    u_xlat16_2.xyz = u_xlat16_0.xyz * vec3(2.0, 2.0, 2.0) + vec3(-1.0, -1.0, -1.0);
    u_xlat16_2.xy = u_xlat16_2.xy * vec2(_BumpScale);
    u_xlat16_3.xyz = u_xlat16_2.yyy * vs_TEXCOORD3.xyz;
    u_xlat16_2.xyw = vs_TEXCOORD2.xyz * u_xlat16_2.xxx + u_xlat16_3.xyz;
    u_xlat16_2.xyz = vs_TEXCOORD4.xyz * u_xlat16_2.zzz + u_xlat16_2.xyw;
    u_xlat16_0.x = dot(u_xlat16_2.xyz, u_xlat16_2.xyz);
    u_xlat16_0.x = inversesqrt(u_xlat16_0.x);
    u_xlat16_0.xyz = u_xlat16_0.xxx * u_xlat16_2.xyz;
    u_xlat36 = dot(vs_TEXCOORD1.xyz, vs_TEXCOORD1.xyz);
    u_xlat36 = inversesqrt(u_xlat36);
    u_xlat4.xyz = vec3(u_xlat36) * vs_TEXCOORD1.xyz;
    u_xlat5.xyz = (-vs_TEXCOORD8.xyz) + _WorldSpaceCameraPos.xyz;
    u_xlat6.x = hlslcc_mtx4x4unity_MatrixV[0].z;
    u_xlat6.y = hlslcc_mtx4x4unity_MatrixV[1].z;
    u_xlat6.z = hlslcc_mtx4x4unity_MatrixV[2].z;
    u_xlat40 = dot(u_xlat5.xyz, u_xlat6.xyz);
    u_xlat5.xyz = vs_TEXCOORD8.xyz + (-unity_ShadowFadeCenterAndType.xyz);
    u_xlat5.x = dot(u_xlat5.xyz, u_xlat5.xyz);
    u_xlat5.x = sqrt(u_xlat5.x);
    u_xlat5.x = (-u_xlat40) + u_xlat5.x;
    u_xlat40 = unity_ShadowFadeCenterAndType.w * u_xlat5.x + u_xlat40;
    u_xlat40 = u_xlat40 * _LightShadowData.z + _LightShadowData.w;
#ifdef UNITY_ADRENO_ES3
    u_xlat40 = min(max(u_xlat40, 0.0), 1.0);
#else
    u_xlat40 = clamp(u_xlat40, 0.0, 1.0);
#endif
    u_xlat5.xy = vs_TEXCOORD7.xy / vs_TEXCOORD7.ww;
    u_xlat16_5.x = texture(_ShadowMapTexture, u_xlat5.xy).x;
    u_xlat16_2.x = (-u_xlat16_5.x) + 1.0;
    u_xlat16_2.x = u_xlat40 * u_xlat16_2.x + u_xlat16_5.x;
    u_xlat16_40 = texture(_OcclusionMap, vs_TEXCOORD0.xy).y;
    u_xlat16_14.x = (-_OcclusionStrength) + 1.0;
    u_xlat16_14.x = u_xlat16_40 * _OcclusionStrength + u_xlat16_14.x;
    u_xlat40 = (-_Glossiness) + 1.0;
    u_xlat16_26 = dot(u_xlat4.xyz, u_xlat16_0.xyz);
    u_xlat16_26 = u_xlat16_26 + u_xlat16_26;
    u_xlat16_3.xyz = u_xlat16_0.xyz * (-vec3(u_xlat16_26)) + u_xlat4.xyz;
    u_xlat16_2.xzw = u_xlat16_2.xxx * _LightColor0.xyz;
#ifdef UNITY_ADRENO_ES3
    u_xlatb5 = !!(0.0<unity_SpecCube0_ProbePosition.w);
#else
    u_xlatb5 = 0.0<unity_SpecCube0_ProbePosition.w;
#endif
    if(u_xlatb5){
        u_xlat16_5.x = dot(u_xlat16_3.xyz, u_xlat16_3.xyz);
        u_xlat16_5.x = inversesqrt(u_xlat16_5.x);
        u_xlat5.xyz = u_xlat16_3.xyz * u_xlat16_5.xxx;
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
        u_xlat41 = min(u_xlat6.y, u_xlat6.x);
        u_xlat41 = min(u_xlat6.z, u_xlat41);
        u_xlat6.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube0_ProbePosition.xyz);
        u_xlat5.xyz = u_xlat5.xyz * vec3(u_xlat41) + u_xlat6.xyz;
    } else {
        u_xlat5.xyz = u_xlat16_3.xyz;
    //ENDIF
    }
    u_xlat16_39 = (-u_xlat40) * 0.699999988 + 1.70000005;
    u_xlat16_39 = u_xlat16_39 * u_xlat40;
    u_xlat16_39 = u_xlat16_39 * 6.0;
    u_xlat16_5 = textureLod(unity_SpecCube0, u_xlat5.xyz, u_xlat16_39);
    u_xlat16_9.x = u_xlat16_5.w + -1.0;
    u_xlat16_9.x = unity_SpecCube0_HDR.w * u_xlat16_9.x + 1.0;
    u_xlat16_9.x = u_xlat16_9.x * unity_SpecCube0_HDR.x;
    u_xlat16_21.xyz = u_xlat16_5.xyz * u_xlat16_9.xxx;
#ifdef UNITY_ADRENO_ES3
    u_xlatb41 = !!(unity_SpecCube0_BoxMin.w<0.999989986);
#else
    u_xlatb41 = unity_SpecCube0_BoxMin.w<0.999989986;
#endif
    if(u_xlatb41){
#ifdef UNITY_ADRENO_ES3
        u_xlatb41 = !!(0.0<unity_SpecCube1_ProbePosition.w);
#else
        u_xlatb41 = 0.0<unity_SpecCube1_ProbePosition.w;
#endif
        if(u_xlatb41){
            u_xlat16_41 = dot(u_xlat16_3.xyz, u_xlat16_3.xyz);
            u_xlat16_41 = inversesqrt(u_xlat16_41);
            u_xlat6.xyz = u_xlat16_3.xyz * vec3(u_xlat16_41);
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
            u_xlat41 = min(u_xlat7.y, u_xlat7.x);
            u_xlat41 = min(u_xlat7.z, u_xlat41);
            u_xlat7.xyz = vs_TEXCOORD8.xyz + (-unity_SpecCube1_ProbePosition.xyz);
            u_xlat6.xyz = u_xlat6.xyz * vec3(u_xlat41) + u_xlat7.xyz;
        } else {
            u_xlat6.xyz = u_xlat16_3.xyz;
        //ENDIF
        }
        u_xlat16_3 = textureLod(unity_SpecCube1, u_xlat6.xyz, u_xlat16_39);
        u_xlat16_11.x = u_xlat16_3.w + -1.0;
        u_xlat16_11.x = unity_SpecCube1_HDR.w * u_xlat16_11.x + 1.0;
        u_xlat16_11.x = u_xlat16_11.x * unity_SpecCube1_HDR.x;
        u_xlat16_11.xyz = u_xlat16_3.xyz * u_xlat16_11.xxx;
        u_xlat16_5.xyz = u_xlat16_9.xxx * u_xlat16_5.xyz + (-u_xlat16_11.xyz);
        u_xlat21.xyz = unity_SpecCube0_BoxMin.www * u_xlat16_5.xyz + u_xlat16_11.xyz;
        u_xlat16_21.xyz = u_xlat21.xyz;
    //ENDIF
    }
    u_xlat16_9.xyz = u_xlat16_14.xxx * u_xlat16_21.xyz;
    u_xlat5.xyz = (-vs_TEXCOORD1.xyz) * vec3(u_xlat36) + _WorldSpaceLightPos0.xyz;
    u_xlat36 = dot(u_xlat5.xyz, u_xlat5.xyz);
    u_xlat36 = max(u_xlat36, 0.00100000005);
    u_xlat36 = inversesqrt(u_xlat36);
    u_xlat5.xyz = vec3(u_xlat36) * u_xlat5.xyz;
    u_xlat36 = dot(u_xlat16_0.xyz, (-u_xlat4.xyz));
    u_xlat16_4.x = dot(u_xlat16_0.xyz, _WorldSpaceLightPos0.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat16_4.x = min(max(u_xlat16_4.x, 0.0), 1.0);
#else
    u_xlat16_4.x = clamp(u_xlat16_4.x, 0.0, 1.0);
#endif
    u_xlat0.x = dot(u_xlat16_0.xyz, u_xlat5.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat0.x = min(max(u_xlat0.x, 0.0), 1.0);
#else
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);
#endif
    u_xlat12 = dot(_WorldSpaceLightPos0.xyz, u_xlat5.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat12 = min(max(u_xlat12, 0.0), 1.0);
#else
    u_xlat12 = clamp(u_xlat12, 0.0, 1.0);
#endif
    u_xlat16_14.x = u_xlat12 + u_xlat12;
    u_xlat16_14.x = u_xlat12 * u_xlat16_14.x;
    u_xlat16_14.x = u_xlat16_14.x * u_xlat40 + -0.5;
    u_xlat16_45 = (-u_xlat16_4.x) + 1.0;
    u_xlat16_11.x = u_xlat16_45 * u_xlat16_45;
    u_xlat16_11.x = u_xlat16_11.x * u_xlat16_11.x;
    u_xlat16_45 = u_xlat16_45 * u_xlat16_11.x;
    u_xlat16_45 = u_xlat16_14.x * u_xlat16_45 + 1.0;
    u_xlat16_11.x = -abs(u_xlat36) + 1.0;
    u_xlat16_23.x = u_xlat16_11.x * u_xlat16_11.x;
    u_xlat16_23.x = u_xlat16_23.x * u_xlat16_23.x;
    u_xlat16_11.x = u_xlat16_11.x * u_xlat16_23.x;
    u_xlat16_14.x = u_xlat16_14.x * u_xlat16_11.x + 1.0;
    u_xlat16_14.x = u_xlat16_14.x * u_xlat16_45;
    u_xlat16_24 = u_xlat16_4.x * u_xlat16_14.x;
    u_xlat16 = u_xlat40 * u_xlat40;
    u_xlat16 = max(u_xlat16, 0.00200000009);
    u_xlat28 = (-u_xlat16) + 1.0;
    u_xlat5.x = abs(u_xlat36) * u_xlat28 + u_xlat16;
    u_xlat28 = u_xlat16_4.x * u_xlat28 + u_xlat16;
    u_xlat36 = abs(u_xlat36) * u_xlat28;
    u_xlat36 = u_xlat16_4.x * u_xlat5.x + u_xlat36;
    u_xlat36 = u_xlat36 + 9.99999975e-06;
    u_xlat36 = 0.5 / u_xlat36;
    u_xlat28 = u_xlat16 * u_xlat16;
    u_xlat5.x = u_xlat0.x * u_xlat28 + (-u_xlat0.x);
    u_xlat0.x = u_xlat5.x * u_xlat0.x + 1.0;
    u_xlat28 = u_xlat28 * 0.318309873;
    u_xlat0.x = u_xlat0.x * u_xlat0.x + 1.00000001e-07;
    u_xlat0.x = u_xlat28 / u_xlat0.x;
    u_xlat0.x = u_xlat0.x * u_xlat36;
    u_xlat0.x = u_xlat0.x * 3.14159274;
    u_xlat0.x = max(u_xlat0.x, 9.99999975e-05);
    u_xlat0.x = sqrt(u_xlat0.x);
    u_xlat0.x = u_xlat16_4.x * u_xlat0.x;
    u_xlat36 = u_xlat16 * u_xlat40;
    u_xlat36 = (-u_xlat36) * 0.280000001 + 1.0;
    u_xlat16_14.x = dot(_SpecColor.xyz, _SpecColor.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlatb4 = !!(u_xlat16_14.x!=0.0);
#else
    u_xlatb4 = u_xlat16_14.x!=0.0;
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
    u_xlat16_23.xyz = vec3(u_xlat16_24) * u_xlat16_2.xzw;
    u_xlat4.xyz = u_xlat16_2.xzw * u_xlat0.xxx;
    u_xlat16_2.x = (-u_xlat12) + 1.0;
    u_xlat16_14.x = u_xlat16_2.x * u_xlat16_2.x;
    u_xlat16_14.x = u_xlat16_14.x * u_xlat16_14.x;
    u_xlat16_2.x = u_xlat16_2.x * u_xlat16_14.x;
    u_xlat16_14.xyz = (-_SpecColor.xyz) + vec3(1.0, 1.0, 1.0);
    u_xlat16_2.xyz = u_xlat16_14.xyz * u_xlat16_2.xxx + _SpecColor.xyz;
    u_xlat0.xyz = u_xlat16_2.xyz * u_xlat4.xyz;
    u_xlat0.xyz = u_xlat16_13.xyz * u_xlat16_23.xyz + u_xlat0.xyz;
    u_xlat16_13.xyz = u_xlat16_9.xyz * vec3(u_xlat36);
    u_xlat16_2.xyz = vec3(u_xlat16_1) + (-_SpecColor.xyz);
    u_xlat16_2.xyz = u_xlat16_11.xxx * u_xlat16_2.xyz + _SpecColor.xyz;
    u_xlat0.xyz = u_xlat16_13.xyz * u_xlat16_2.xyz + u_xlat0.xyz;
    u_xlat16_4.xyz = texture(_EmissionMap, vs_TEXCOORD0.xy).xyz;
    SV_Target0.xyz = u_xlat16_4.xyz * _EmissionColor.xyz + u_xlat0.xyz;
    SV_Target0.w = 1.0;
    return;
}

