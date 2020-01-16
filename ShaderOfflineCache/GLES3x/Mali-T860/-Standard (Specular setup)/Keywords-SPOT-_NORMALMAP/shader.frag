#version 300 es

precision highp float;
precision highp int;
uniform 	mediump vec4 _LightColor0;
uniform 	mediump vec4 _SpecColor;
uniform 	mediump vec4 _Color;
uniform 	float _Glossiness;
uniform 	vec4 hlslcc_mtx4x4unity_WorldToLight[4];
uniform mediump sampler2D _MainTex;
uniform mediump sampler2D _BumpMap;
uniform highp sampler2D _LightTexture0;
uniform highp sampler2D _LightTextureB0;
uniform highp sampler2D unity_NHxRoughness;
in highp vec4 vs_TEXCOORD0;
in highp vec4 vs_TEXCOORD1;
in highp vec4 vs_TEXCOORD2;
in highp vec4 vs_TEXCOORD3;
in highp vec4 vs_TEXCOORD4;
in highp vec3 vs_TEXCOORD5;
layout(location = 0) out mediump vec4 SV_Target0;
vec3 u_xlat0;
mediump vec4 u_xlat16_0;
mediump vec4 u_xlat16_1;
vec4 u_xlat2;
mediump vec3 u_xlat16_2;
vec3 u_xlat3;
mediump vec3 u_xlat16_4;
float u_xlat5;
bool u_xlatb10;
float u_xlat15;
mediump float u_xlat16_16;
void main()
{
    u_xlat16_0.xyz = texture(_BumpMap, vs_TEXCOORD0.xy).xyz;
    u_xlat16_1.xyz = u_xlat16_0.xyz * vec3(2.0, 2.0, 2.0) + vec3(-1.0, -1.0, -1.0);
    u_xlat16_2.xyz = u_xlat16_1.yyy * vs_TEXCOORD3.xyz;
    u_xlat16_1.xyw = vs_TEXCOORD2.xyz * u_xlat16_1.xxx + u_xlat16_2.xyz;
    u_xlat16_1.xyz = vs_TEXCOORD4.xyz * u_xlat16_1.zzz + u_xlat16_1.xyw;
    u_xlat0.x = dot((-vs_TEXCOORD1.xyz), u_xlat16_1.xyz);
    u_xlat0.x = u_xlat0.x + u_xlat0.x;
    u_xlat0.xyz = u_xlat16_1.xyz * (-u_xlat0.xxx) + (-vs_TEXCOORD1.xyz);
    u_xlat3.x = vs_TEXCOORD2.w;
    u_xlat3.y = vs_TEXCOORD3.w;
    u_xlat3.z = vs_TEXCOORD4.w;
    u_xlat0.x = dot(u_xlat0.xyz, u_xlat3.xyz);
    u_xlat5 = dot(u_xlat16_1.xyz, u_xlat3.xyz);
#ifdef UNITY_ADRENO_ES3
    u_xlat5 = min(max(u_xlat5, 0.0), 1.0);
#else
    u_xlat5 = clamp(u_xlat5, 0.0, 1.0);
#endif
    u_xlat0.x = u_xlat0.x * u_xlat0.x;
    u_xlat3.x = u_xlat0.x * u_xlat0.x;
    u_xlat3.y = (-_Glossiness) + 1.0;
    u_xlat0.x = texture(unity_NHxRoughness, u_xlat3.xy).x;
    u_xlat0.x = u_xlat0.x * 16.0;
    u_xlat16_1.xyz = u_xlat0.xxx * _SpecColor.xyz;
    u_xlat16_0.xzw = texture(_MainTex, vs_TEXCOORD0.xy).xyz;
    u_xlat16_0.xzw = u_xlat16_0.xzw * _Color.xyz;
    u_xlat16_16 = (-_SpecColor.x) + 1.0;
    u_xlat16_1.xyz = u_xlat16_0.xzw * vec3(u_xlat16_16) + u_xlat16_1.xyz;
    u_xlat2 = vs_TEXCOORD5.yyyy * hlslcc_mtx4x4unity_WorldToLight[1];
    u_xlat2 = hlslcc_mtx4x4unity_WorldToLight[0] * vs_TEXCOORD5.xxxx + u_xlat2;
    u_xlat2 = hlslcc_mtx4x4unity_WorldToLight[2] * vs_TEXCOORD5.zzzz + u_xlat2;
    u_xlat2 = u_xlat2 + hlslcc_mtx4x4unity_WorldToLight[3];
    u_xlat0.xz = u_xlat2.xy / u_xlat2.ww;
    u_xlat0.xz = u_xlat0.xz + vec2(0.5, 0.5);
    u_xlat0.x = texture(_LightTexture0, u_xlat0.xz).w;
#ifdef UNITY_ADRENO_ES3
    u_xlatb10 = !!(0.0<u_xlat2.z);
#else
    u_xlatb10 = 0.0<u_xlat2.z;
#endif
    u_xlat15 = dot(u_xlat2.xyz, u_xlat2.xyz);
    u_xlat15 = texture(_LightTextureB0, vec2(u_xlat15)).x;
    u_xlat16_16 = (u_xlatb10) ? 1.0 : 0.0;
    u_xlat16_16 = u_xlat0.x * u_xlat16_16;
    u_xlat16_16 = u_xlat15 * u_xlat16_16;
    u_xlat16_4.xyz = vec3(u_xlat16_16) * _LightColor0.xyz;
    u_xlat16_4.xyz = vec3(u_xlat5) * u_xlat16_4.xyz;
    SV_Target0.xyz = u_xlat16_1.xyz * u_xlat16_4.xyz;
    SV_Target0.w = 1.0;
    return;
}
