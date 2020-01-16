# ShadingPerfInUnity
Simulating Unreal's Shader Complexity and Quad Overdraw in Unity

Unity 2018.4.x
Models from:
https://free3d.com/3d-model/watch-tower-made-of-wood-94934.html
https://free3d.com/3d-model/plane-table-chimny-plinth-object-516352.html


### Shader Complexity
![Shading Mode/Shader Complexity](/Figures/ShaderComplexity.png)

* pseudo code
``` C#
if (!shaderComplexityInCache)
{
    callUnityOpenCompiledShaderUsingRelection();
    extractVertexAndFragmentShaderFromCompiledShaderFile();
    callMaliOfflineComilerWithExtracedShaderFile();
    parseShaderComplexityInfo();
    cache();
}
return cachedShaderComplexity;
```

ref:
[Arm MS Streamline 2019.2](https://developer.arm.com/tools-and-software/graphics-and-gaming/arm-mobile-studio/downloads)

### Quad Overdraw
![Shading Mode/Quad Overdraw](/Figures/QuadOverdraw.png)

* pseudo code
``` C#
quadOverdrawAccumulate();
quadOverdrawApp(); // full screen image effect
quadOverdrawClear();
```
ref:
[Counting Quads](https://blog.selfshadow.com/2012/11/12/counting-quads/)

### Preferences
![Shading Mode/Preferences](/Figures/Preferences.png)
