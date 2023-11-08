import{_ as r,o as a,c as e,e as d}from"./app-3a7887e8.js";const i={},l=d('<h1 id="jvm指令手册" tabindex="-1"><a class="header-anchor" href="#jvm指令手册" aria-hidden="true">#</a> JVM指令手册</h1><h2 id="栈和局部变量操作" tabindex="-1"><a class="header-anchor" href="#栈和局部变量操作" aria-hidden="true">#</a> 栈和局部变量操作</h2><h3 id="将常量压入栈的指令" tabindex="-1"><a class="header-anchor" href="#将常量压入栈的指令" aria-hidden="true">#</a> 将常量压入栈的指令</h3><p>aconst_null 将null对象引用压入栈<br> iconst_m1 将int类型常量-1压入栈<br> iconst_0 将int类型常量0压入栈<br> iconst_1 将int类型常量1压入操作数栈<br> iconst_2 将int类型常量2压入栈<br> iconst_3 将int类型常量3压入栈<br> iconst_4 将int类型常量4压入栈<br> iconst_5 将int类型常量5压入栈<br> lconst_0 将long类型常量0压入栈<br> lconst_1 将long类型常量1压入栈<br> fconst_0 将float类型常量0压入栈<br> fconst_1 将float类型常量1压入栈<br> dconst_0 将double类型常量0压入栈<br> dconst_1 将double类型常量1压入栈<br> bipush 将一个8位带符号整数压入栈<br> sipush 将16位带符号整数压入栈<br> ldc 把常量池中的项压入栈<br> ldc_w 把常量池中的项压入栈（使用宽索引）<br> ldc2_w 把常量池中long类型或者double类型的项压入栈（使用宽索引）</p><h3 id="从栈中的局部变量中装载值的指令" tabindex="-1"><a class="header-anchor" href="#从栈中的局部变量中装载值的指令" aria-hidden="true">#</a> 从栈中的局部变量中装载值的指令</h3><p>iload 从局部变量中装载int类型值<br> lload 从局部变量中装载long类型值<br> fload 从局部变量中装载float类型值<br> dload 从局部变量中装载double类型值<br> aload 从局部变量中装载引用类型值（refernce）<br> iload_0 从局部变量0中装载int类型值<br> iload_1 从局部变量1中装载int类型值<br> iload_2 从局部变量2中装载int类型值<br> iload_3 从局部变量3中装载int类型值<br> lload_0 从局部变量0中装载long类型值<br> lload_1 从局部变量1中装载long类型值<br> lload_2 从局部变量2中装载long类型值<br> lload_3 从局部变量3中装载long类型值<br> fload_0 从局部变量0中装载float类型值<br> fload_1 从局部变量1中装载float类型值<br> fload_2 从局部变量2中装载float类型值<br> fload_3 从局部变量3中装载float类型值<br> dload_0 从局部变量0中装载double类型值<br> dload_1 从局部变量1中装载double类型值<br> dload_2 从局部变量2中装载double类型值<br> dload_3 从局部变量3中装载double类型值<br> aload_0 从局部变量0中装载引用类型值<br> aload_1 从局部变量1中装载引用类型值<br> aload_2 从局部变量2中装载引用类型值<br> aload_3 从局部变量3中装载引用类型值<br> iaload 从数组中装载int类型值<br> laload 从数组中装载long类型值<br> faload 从数组中装载float类型值<br> daload 从数组中装载double类型值<br> aaload 从数组中装载引用类型值<br> baload 从数组中装载byte类型或boolean类型值<br> caload 从数组中装载char类型值<br> saload 从数组中装载short类型值</p><h3 id="将栈中的值存入局部变量的指令" tabindex="-1"><a class="header-anchor" href="#将栈中的值存入局部变量的指令" aria-hidden="true">#</a> 将栈中的值存入局部变量的指令</h3><p>istore 将int类型值存入局部变量<br> lstore 将long类型值存入局部变量<br> fstore 将float类型值存入局部变量<br> dstore 将double类型值存入局部变量<br> astore 将将引用类型或returnAddress类型值存入局部变量<br> istore_0 将int类型值存入局部变量0<br> istore_1 将int类型值存入局部变量1<br> istore_2 将int类型值存入局部变量2<br> istore_3 将int类型值存入局部变量3<br> lstore_0 将long类型值存入局部变量0<br> lstore_1 将long类型值存入局部变量1<br> lstore_2 将long类型值存入局部变量2<br> lstore_3 将long类型值存入局部变量3<br> fstore_0 将float类型值存入局部变量0<br> fstore_1 将float类型值存入局部变量1<br> fstore_2 将float类型值存入局部变量2<br> fstore_3 将float类型值存入局部变量3<br> dstore_0 将double类型值存入局部变量0<br> dstore_1 将double类型值存入局部变量1<br> dstore_2 将double类型值存入局部变量2<br> dstore_3 将double类型值存入局部变量3<br> astore_0 将引用类型或returnAddress类型值存入局部变量0<br> astore_1 将引用类型或returnAddress类型值存入局部变量1<br> astore_2 将引用类型或returnAddress类型值存入局部变量2<br> astore_3 将引用类型或returnAddress类型值存入局部变量3<br> iastore 将int类型值存入数组中<br> lastore 将long类型值存入数组中<br> fastore 将float类型值存入数组中<br> dastore 将double类型值存入数组中<br> aastore 将引用类型值存入数组中<br> bastore 将byte类型或者boolean类型值存入数组中<br> castore 将char类型值存入数组中<br> sastore 将short类型值存入数组中</p><h3 id="wide指令" tabindex="-1"><a class="header-anchor" href="#wide指令" aria-hidden="true">#</a> wide指令</h3><p>wide 使用附加字节扩展局部变量索引</p><h3 id="通用-无类型-栈操作" tabindex="-1"><a class="header-anchor" href="#通用-无类型-栈操作" aria-hidden="true">#</a> 通用(无类型）栈操作</h3><p>nop 不做任何操作<br> pop 弹出栈顶端一个字长的内容<br> pop2 弹出栈顶端两个字长的内容<br> dup 复制栈顶部一个字长内容<br> dup_x1 复制栈顶部一个字长的内容，然后将复制内容及原来弹出的两个字长的内容压入栈<br> dup_x2 复制栈顶部一个字长的内容，然后将复制内容及原来弹出的三个字长的内容压入栈<br> dup2 复制栈顶部两个字长内容<br> dup2_x1 复制栈顶部两个字长的内容，然后将复制内容及原来弹出的三个字长的内容压入栈<br> dup2_x2 复制栈顶部两个字长的内容，然后将复制内容及原来弹出的四个字长的内容压入栈<br> swap 交换栈顶部两个字长内容</p><h2 id="类型转换" tabindex="-1"><a class="header-anchor" href="#类型转换" aria-hidden="true">#</a> 类型转换</h2><p>i2l 把int类型的数据转化为long类型<br> i2f 把int类型的数据转化为float类型<br> i2d 把int类型的数据转化为double类型<br> l2i 把long类型的数据转化为int类型<br> l2f 把long类型的数据转化为float类型<br> l2d 把long类型的数据转化为double类型<br> f2i 把float类型的数据转化为int类型<br> f2l 把float类型的数据转化为long类型<br> f2d 把float类型的数据转化为double类型<br> d2i 把double类型的数据转化为int类型<br> d2l 把double类型的数据转化为long类型<br> d2f 把double类型的数据转化为float类型<br> i2b 把int类型的数据转化为byte类型<br> i2c 把int类型的数据转化为char类型<br> i2s 把int类型的数据转化为short类型</p><h2 id="整数运算" tabindex="-1"><a class="header-anchor" href="#整数运算" aria-hidden="true">#</a> 整数运算</h2><p>iadd 执行int类型的加法<br> ladd 执行long类型的加法<br> isub 执行int类型的减法<br> lsub 执行long类型的减法<br> imul 执行int类型的乘法<br> lmul 执行long类型的乘法<br> idiv 执行int类型的除法<br> ldiv 执行long类型的除法<br> irem 计算int类型除法的余数<br> lrem 计算long类型除法的余数<br> ineg 对一个int类型值进行取反操作<br> lneg 对一个long类型值进行取反操作<br> iinc 把一个常量值加到一个int类型的局部变量上</p><h2 id="逻辑运算" tabindex="-1"><a class="header-anchor" href="#逻辑运算" aria-hidden="true">#</a> 逻辑运算</h2><h3 id="移位操作" tabindex="-1"><a class="header-anchor" href="#移位操作" aria-hidden="true">#</a> 移位操作</h3><p>ishl 执行int类型的向左移位操作<br> lshl 执行long类型的向左移位操作<br> ishr 执行int类型的向右移位操作<br> lshr 执行long类型的向右移位操作<br> iushr 执行int类型的向右逻辑移位操作<br> lushr 执行long类型的向右逻辑移位操作</p><h3 id="按位布尔运算" tabindex="-1"><a class="header-anchor" href="#按位布尔运算" aria-hidden="true">#</a> 按位布尔运算</h3><p>iand 对int类型值进行“逻辑与”操作<br> land 对long类型值进行“逻辑与”操作<br> ior 对int类型值进行“逻辑或”操作<br> lor 对long类型值进行“逻辑或”操作<br> ixor 对int类型值进行“逻辑异或”操作<br> lxor 对long类型值进行“逻辑异或”操作</p><h3 id="浮点运算" tabindex="-1"><a class="header-anchor" href="#浮点运算" aria-hidden="true">#</a> 浮点运算</h3><p>fadd 执行float类型的加法<br> dadd 执行double类型的加法<br> fsub 执行float类型的减法<br> dsub 执行double类型的减法<br> fmul 执行float类型的乘法<br> dmul 执行double类型的乘法<br> fdiv 执行float类型的除法<br> ddiv 执行double类型的除法<br> frem 计算float类型除法的余数<br> drem 计算double类型除法的余数<br> fneg 将一个float类型的数值取反<br> dneg 将一个double类型的数值取反</p><h2 id="对象和数组" tabindex="-1"><a class="header-anchor" href="#对象和数组" aria-hidden="true">#</a> 对象和数组</h2><h3 id="对象操作指令" tabindex="-1"><a class="header-anchor" href="#对象操作指令" aria-hidden="true">#</a> 对象操作指令</h3><p>new 创建一个新对象<br> checkcast 确定对象为所给定的类型<br> getfield 从对象中获取字段<br> putfield 设置对象中字段的值<br> getstatic 从类中获取静态字段<br> putstatic 设置类中静态字段的值<br> instanceof 判断对象是否为给定的类型</p><h3 id="数组操作指令" tabindex="-1"><a class="header-anchor" href="#数组操作指令" aria-hidden="true">#</a> 数组操作指令</h3><p>newarray 分配数据成员类型为基本上数据类型的新数组<br> anewarray 分配数据成员类型为引用类型的新数组<br> arraylength 获取数组长度<br> multianewarray 分配新的多维数组</p><h2 id="控制流" tabindex="-1"><a class="header-anchor" href="#控制流" aria-hidden="true">#</a> 控制流</h2><h3 id="条件分支指令" tabindex="-1"><a class="header-anchor" href="#条件分支指令" aria-hidden="true">#</a> 条件分支指令</h3><p>ifeq 如果等于0，则跳转<br> ifne 如果不等于0，则跳转<br> iflt 如果小于0，则跳转<br> ifge 如果大于等于0，则跳转<br> ifgt 如果大于0，则跳转<br> ifle 如果小于等于0，则跳转<br> if_icmpcq 如果两个int值相等，则跳转<br> if_icmpne 如果两个int类型值不相等，则跳转<br> if_icmplt 如果一个int类型值小于另外一个int类型值，则跳转<br> f_icmpge 如果一个int类型值大于或者等于另外一个int类型值，则跳转<br> if_icmpgt 如果一个int类型值大于另外一个int类型值，则跳转<br> if_icmple 如果一个int类型值小于或者等于另外一个int类型值，则跳转<br> ifnull 如果等于null，则跳转<br> ifnonnull 如果不等于null，则跳转<br> if_acmpeq 如果两个对象引用相等，则跳转<br> if_acmpnc 如果两个对象引用不相等，则跳转</p><h3 id="比较指令" tabindex="-1"><a class="header-anchor" href="#比较指令" aria-hidden="true">#</a> 比较指令</h3><p>lcmp 比较long类型值<br> fcmpl 比较float类型值（当遇到NaN时，返回-1）<br> fcmpg 比较float类型值（当遇到NaN时，返回1）<br> dcmpl 比较double类型值（当遇到NaN时，返回-1）<br> dcmpg 比较double类型值（当遇到NaN时，返回1）</p><h3 id="无条件转移指令" tabindex="-1"><a class="header-anchor" href="#无条件转移指令" aria-hidden="true">#</a> 无条件转移指令</h3><p>goto 无条件跳转<br> goto_w 无条件跳转（宽索引）</p><h3 id="表跳转指令" tabindex="-1"><a class="header-anchor" href="#表跳转指令" aria-hidden="true">#</a> 表跳转指令</h3><p>tableswitch 通过索引访问跳转表，并跳转<br> lookupswitch 通过键值匹配访问跳转表，并执行跳转操作</p><h2 id="异常" tabindex="-1"><a class="header-anchor" href="#异常" aria-hidden="true">#</a> 异常</h2><p>athrow 抛出异常或错误<br> finally子句<br> jsr 跳转到子例程<br> jsr_w 跳转到子例程（宽索引）<br> rct 从子例程返回</p><h2 id="方法调用与返回" tabindex="-1"><a class="header-anchor" href="#方法调用与返回" aria-hidden="true">#</a> 方法调用与返回</h2><h3 id="方法调用指令" tabindex="-1"><a class="header-anchor" href="#方法调用指令" aria-hidden="true">#</a> 方法调用指令</h3><p>invokcvirtual 运行时按照对象的类来调用实例方法<br> invokespecial 根据编译时类型来调用实例方法<br> invokestatic 调用类（静态）方法<br> invokcinterface 调用接口方法</p><h3 id="方法返回指令" tabindex="-1"><a class="header-anchor" href="#方法返回指令" aria-hidden="true">#</a> 方法返回指令</h3><p>ireturn 从方法中返回int类型的数据<br> lreturn 从方法中返回long类型的数据<br> freturn 从方法中返回float类型的数据<br> dreturn 从方法中返回double类型的数据<br> areturn 从方法中返回引用类型的数据<br> return 从方法中返回，返回值为void</p><h2 id="线程同步" tabindex="-1"><a class="header-anchor" href="#线程同步" aria-hidden="true">#</a> 线程同步</h2><p>montiorenter 进入并获取对象监视器<br> monitorexit 释放并退出对象监视器</p><h2 id="jvm指令助记符" tabindex="-1"><a class="header-anchor" href="#jvm指令助记符" aria-hidden="true">#</a> JVM指令助记符</h2><p>变量到操作数栈：iload,iload_,lload,lload_,fload,fload_,dload,dload_,aload,aload_<br> 操作数栈到变量：istore,istore_,lstore,lstore_,fstore,fstore_,dstore,dstor_,astore,astore_<br> 常数到操作数栈：bipush,sipush,ldc,ldc_w,ldc2_w,aconst_null,iconst_ml,iconst_,lconst_,fconst_,dconst_<br> 加：iadd,ladd,fadd,dadd<br> 减：isub,lsub,fsub,dsub<br> 乘：imul,lmul,fmul,dmul<br> 除：idiv,ldiv,fdiv,ddiv<br> 余数：irem,lrem,frem,drem<br> 取负：ineg,lneg,fneg,dneg<br> 移位：ishl,lshr,iushr,lshl,lshr,lushr<br> 按位或：ior,lor<br> 按位与：iand,land<br> 按位异或：ixor,lxor<br> 类型转换：i2l,i2f,i2d,l2f,l2d,f2d(放宽数值转换)<br> i2b,i2c,i2s,l2i,f2i,f2l,d2i,d2l,d2f(缩窄数值转换)<br> 创建类实便：new<br> 创建新数组：newarray,anewarray,multianwarray<br> 访问类的域和类实例域：getfield,putfield,getstatic,putstatic<br> 把数据装载到操作数栈：baload,caload,saload,iaload,laload,faload,daload,aaload<br> 从操作数栈存存储到数组：<br> bastore,castore,sastore,iastore,lastore,fastore,dastore,aastore<br> 获取数组长度：arraylength<br> 检相类实例或数组属性：instanceof,checkcast<br> 操作数栈管理：pop,pop2,dup,dup2,dup_xl,dup2_xl,dup_x2,dup2_x2,swap<br> 有条件转移：ifeq,iflt,ifle,ifne,ifgt,ifge,ifnull,ifnonnull,if_icmpeq,if_icmpene,<br> if_icmplt,if_icmpgt,if_icmple,if_icmpge,if_acmpeq,if_acmpne,lcmp,fcmpl<br> fcmpg,dcmpl,dcmpg<br> 复合条件转移：tableswitch,lookupswitch<br> 无条件转移：goto,goto_w,jsr,jsr_w,ret<br> 调度对象的实便方法：invokevirtual<br> 调用由接口实现的方法：invokeinterface<br> 调用需要特殊处理的实例方法：invokespecial<br> 调用命名类中的静态方法：invokestatic<br> 方法返回：ireturn,lreturn,freturn,dreturn,areturn,return<br> 异常：athrow<br> finally关键字的实现使用：jsr,jsr_w,ret</p>',48),o=[l];function t(b,n){return a(),e("div",null,o)}const h=r(i,[["render",t],["__file","2311081109.html.vue"]]);export{h as default};
