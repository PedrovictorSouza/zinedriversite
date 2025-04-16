class UnityInstanceManager {
  constructor() {
    if (UnityInstanceManager.instance) {
      return UnityInstanceManager.instance;
    }
    this.unityInstance = null;
    this.isInitializing = false;
    this.initPromise = null;
    UnityInstanceManager.instance = this;
  }

  async initialize(canvas) {
    // Se já temos uma instância, retorna ela
    if (this.unityInstance) {
      console.log('Retornando instância existente do Unity');
      return this.unityInstance;
    }

    // Se já está inicializando, retorna a promise existente
    if (this.isInitializing) {
      console.log('Inicialização já em andamento, aguardando...');
      return this.initPromise;
    }

    // Marca que está iniciando e cria uma nova promise
    this.isInitializing = true;
    this.initPromise = new Promise(async (resolve, reject) => {
      try {
        // Carrega o script do loader se necessário
        if (!window.createUnityInstance) {
          await this.loadUnityScript();
        }

        console.log('Iniciando nova instância do Unity...');
        const unityInstance = await window.createUnityInstance(canvas, {
          dataUrl: "/RotateEvadeWebgl/RotateEvade/Build/RotateEvade.data.br",
          frameworkUrl: "/RotateEvadeWebgl/RotateEvade/Build/RotateEvade.framework.js.br",
          codeUrl: "/RotateEvadeWebgl/RotateEvade/Build/RotateEvade.wasm.br",
          streamingAssetsUrl: "/RotateEvadeWebgl/RotateEvade/StreamingAssets",
          companyName: "DefaultCompany",
          productName: "RotateEvade",
          productVersion: "1.0",
        });

        this.unityInstance = unityInstance;
        console.log('Unity inicializado com sucesso');
        resolve(unityInstance);
      } catch (error) {
        console.error('Erro ao inicializar Unity:', error);
        reject(error);
      } finally {
        this.isInitializing = false;
        this.initPromise = null;
      }
    });

    return this.initPromise;
  }

  async loadUnityScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/RotateEvadeWebgl/RotateEvade/Build/RotateEvade.loader.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Falha ao carregar script do Unity'));
      document.body.appendChild(script);
    });
  }

  getInstance() {
    return this.unityInstance;
  }

  quit() {
    if (this.unityInstance) {
      console.log('Encerrando instância do Unity');
      this.unityInstance.Quit();
      this.unityInstance = null;
    }
  }
}

// Exporta uma única instância
export default new UnityInstanceManager(); 