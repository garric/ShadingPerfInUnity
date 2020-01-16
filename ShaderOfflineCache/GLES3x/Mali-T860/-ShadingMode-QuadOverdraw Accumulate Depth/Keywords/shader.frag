#version 310 es
#ifdef GL_OES_shader_image_atomic
#extension GL_OES_shader_image_atomic : enable
#endif
#ifdef GL_ARB_texture_query_levels
#extension GL_ARB_texture_query_levels : enable
#endif
#ifdef GL_ARB_shader_image_size
#extension GL_ARB_shader_image_size : enable
#endif
#extension GL_EXT_texture_buffer : require

precision highp float;
precision highp int;
layout(early_fragment_tests) in;
layout(binding=1, r32i) highp uniform iimage2D RWQuadBuffer;
layout(location = 0) flat in highp uint vs_SvPrimitiveID0;
layout(location = 0) out mediump vec4 SV_Target0;
uvec4 u_xlatu0;
int u_xlati1;
bool u_xlatb1;
int u_xlati2;
uvec2 u_xlatu2;
uint u_xlatu3;
ivec2 u_xlati5;
uint u_xlatu5;
int u_xlati6;
float u_xlat10;
int u_xlati10;
uint u_xlatu10;
bool u_xlatb10;
int u_xlati13;
bool u_xlatb14;
void main()
{
vec4 hlslcc_FragCoord = vec4(gl_FragCoord.xyz, 1.0/gl_FragCoord.w);
    u_xlatu0 = uvec4(hlslcc_FragCoord.xyyy);
    u_xlatu0 = u_xlatu0 >> uvec4(1u, 1u, 1u, 1u);
    u_xlati1 = int(vs_SvPrimitiveID0) << 2;
    u_xlatu5 = (uvec2(imageSize(RWQuadBuffer)).x);
    u_xlatu2.x = u_xlatu5 >> 1u;
    u_xlatu2.y = 0u;
    u_xlati5.xy = ivec2(u_xlatu0.xw) + ivec2(u_xlatu2.xy);
    u_xlati1 = u_xlati1 + 4;
    u_xlati13 = 0;
    u_xlati2 = int(3);
    for(int u_xlati_loop_1 = int(0) ; u_xlati_loop_1<64 ; u_xlati_loop_1++)
    {
        u_xlat10 = float(u_xlati13);
        u_xlatb10 = u_xlat10<0.0;
        if(((int(u_xlatb10) * int(0xffffffffu)))!=0){discard;}
        u_xlatb10 = u_xlati13==2;
        if(u_xlatb10){
            u_xlati10 = imageLoad(RWQuadBuffer, ivec2(u_xlatu0.xw)).x;
            u_xlati10 = int(uint(u_xlati10) & 3u);
            u_xlatb14 = u_xlati2==u_xlati10;
            if(u_xlatb14){
                imageStore(RWQuadBuffer, ivec2(u_xlatu0.xw), ivec4(0, 0, 0, 0));
                imageAtomicAdd(RWQuadBuffer, u_xlati5.xy, 1);
                u_xlati13 = int(0xFFFFFFFFu);
            } else {
                u_xlati13 = 2;
                u_xlati2 = u_xlati10;
            //ENDIF
            }
        //ENDIF
        }
        if(u_xlati13 == 0) {
            u_xlatu3 = uint(imageAtomicCompSwap(RWQuadBuffer, ivec2(u_xlatu0.xw), 0, u_xlati1));
            u_xlati13 = (u_xlatu3 != uint(0)) ? 0 : 2;
            u_xlatu10 = u_xlatu3 >> 2u;
            u_xlati10 = int(u_xlatu10) + int(0xFFFFFFFFu);
            u_xlatb10 = u_xlati10==int(vs_SvPrimitiveID0);
            if(u_xlatb10){
                imageAtomicAdd(RWQuadBuffer, ivec2(u_xlatu0.xw), 1);
                u_xlati13 = int(0xFFFFFFFEu);
            //ENDIF
            }
        //ENDIF
        }
    }
    u_xlatb1 = u_xlati13==2;
    if(u_xlatb1){
        imageStore(RWQuadBuffer, ivec2(u_xlatu0.xy), ivec4(0, 0, 0, 0));
    //ENDIF
    }
    SV_Target0 = vec4(1.0, 0.0, 0.0, 1.0);
    return;
}

