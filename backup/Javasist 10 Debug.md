---
title: Javasist Debug
date: 2019-05-10 20:15:00
---

Set CtClass.debugDump to a directory name. Then all class files modified and generated by Javassist are saved in that directory. To stop this, set CtClass.debugDump to null. The default value is null.

For example,

CtClass.debugDump = "./dump";
All modified class files are saved in ./dump.