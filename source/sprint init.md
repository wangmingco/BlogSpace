
```sequence
participant SpringApplication
participant AnnotationConfigEmbeddedWebApplicationContext
participant BeanDefinitionLoader
participant AbstractApplicationContext
participant GenericApplicationContext
participant PostProcessorRegistrationDelegate
SpringApplication->>SpringApplication: run()
Note right of SpringApplication:  
SpringApplication->>SpringApplication: createApplicationContext() 
SpringApplication->> AnnotationConfigEmbeddedWebApplicationContext: BeanUtils.instantiate(contextClass)
Note right of SpringApplication: 通过反射创建contenxt
AnnotationConfigEmbeddedWebApplicationContext ->> SpringApplication: 生成   ConfigurableApplicationContext
SpringApplication->>SpringApplication: prepareContext()
SpringApplication ->> BeanDefinitionLoader: load() 
Note right of SpringApplication:  进行bean定义加载
SpringApplication->>SpringApplication: refreshContext()
Note right of SpringApplication: 用来调用 AbstractApplicationContext 的refresh方法
AnnotationConfigEmbeddedWebApplicationContext ->> AbstractApplicationContext: refresh()
Note left of AbstractApplicationContext: 初始化容器
AbstractApplicationContext ->> AbstractApplicationContext: prepareRefresh()
Note right of AbstractApplicationContext: refresh准备工作, 设置active标记, 初始化property等
AbstractApplicationContext ->> AbstractApplicationContext: obtainFreshBeanFactory()
Note right of AbstractApplicationContext: 调用子类方法refresh内部beanFactory
AbstractApplicationContext ->> GenericApplicationContext: refreshBeanFactory()
Note left of GenericApplicationContext: 将内部BeanFactory重新设置一个Id.
AbstractApplicationContext ->> AbstractApplicationContext: prepareBeanFactory()
Note right of AbstractApplicationContext: 对beanFactory进行标准化设置
AbstractApplicationContext ->> AbstractApplicationContext: postProcessBeanFactory()
Note right of AbstractApplicationContext: 
AbstractApplicationContext ->> AbstractApplicationContext: invokeBeanFactoryPostProcessors()
AbstractApplicationContext ->> PostProcessorRegistrationDelegate: invokeBeanFactoryPostProcessors
Note over AbstractApplicationContext, PostProcessorRegistrationDelegate: 调用BeanFactoryPostProcessor的postProcessBeanFactory()方法
AbstractApplicationContext ->> AbstractApplicationContext: registerBeanPostProcessors()
Note right of AbstractApplicationContext: 初始化容器
AbstractApplicationContext ->> AbstractApplicationContext: initMessageSource()
Note right of AbstractApplicationContext: TODO
AbstractApplicationContext ->> AbstractApplicationContext: initApplicationEventMulticaster()
Note right of AbstractApplicationContext: TODO
AbstractApplicationContext ->> AbstractApplicationContext: onRefresh()
Note right of AbstractApplicationContext: 初始化容器
AbstractApplicationContext ->> AbstractApplicationContext: registerListeners()
Note right of AbstractApplicationContext: 初始化容器
AbstractApplicationContext ->> AbstractApplicationContext: finishBeanFactoryInitialization()
Note right of AbstractApplicationContext: 初始化容器
AbstractApplicationContext ->> AbstractApplicationContext: finishRefresh()
Note right of AbstractApplicationContext: 初始化容器
```