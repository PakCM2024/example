import type { SimpaResponse } from '../types/simpa';

const mockPages = {
  '/init-simulation': {
    title: 'Type d\'opérations - SIMPA',
    content: `
      <div class="main-content p-8 max-w-5xl mx-auto">
        <div class="mb-6">
          <nav class="flex items-center space-x-3">
            <div class="flex items-center space-x-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium">
              <span class="flex items-center justify-center bg-orange-500 text-white w-5 h-5 rounded-full text-xs">01</span>
              <span>Type d'opérations</span>
            </div>
          </nav>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 group hover:-translate-y-1" data-action="export">
            <div class="flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6 mx-auto group-hover:bg-orange-100 transition-colors">
              <span class="text-3xl">✈️</span>
            </div>
            <h2 class="text-xl font-semibold mb-3 text-center text-gray-900">EXPORTATION</h2>
            <p class="text-gray-600 text-center text-sm leading-relaxed">Procédures pour exporter des marchandises</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 group hover:-translate-y-1" data-action="import">
            <div class="flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6 mx-auto group-hover:bg-orange-100 transition-colors">
              <span class="text-3xl">🚢</span>
            </div>
            <h2 class="text-xl font-semibold mb-3 text-center text-gray-900">IMPORTATION</h2>
            <p class="text-gray-600 text-center text-sm leading-relaxed">Procédures pour importer des marchandises</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 group hover:-translate-y-1" data-action="transit-export">
            <div class="flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6 mx-auto group-hover:bg-orange-100 transition-colors">
              <span class="text-3xl">🚌</span>
            </div>
            <h2 class="text-xl font-semibold mb-3 text-center text-gray-900">TRANSIT EXPORT</h2>
            <p class="text-gray-600 text-center text-sm leading-relaxed">Transit pour l'exportation</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 group hover:-translate-y-1" data-action="transit-import">
            <div class="flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6 mx-auto group-hover:bg-orange-100 transition-colors">
              <span class="text-3xl">🚛</span>
            </div>
            <h2 class="text-xl font-semibold mb-3 text-center text-gray-900">TRANSIT IMPORT</h2>
            <p class="text-gray-600 text-center text-sm leading-relaxed">Transit pour l'importation</p>
          </div>
        </div>

        <div class="mt-12 flex justify-end">
          <button class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl transition-all font-medium shadow-sm hover:shadow-md active:transform active:translate-y-0.5">
            Continuer
          </button>
        </div>
      </div>
    `
  },
  '/simulate-step': {
    title: 'Simulation - SIMPA',
    content: `
      <div class="main-content p-8 max-w-5xl mx-auto">
        <div class="mb-8">
          <nav class="flex items-center space-x-3">
            <div class="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
              <span class="flex items-center justify-center bg-green-500 text-white w-5 h-5 rounded-full text-xs">✓</span>
              <span>Type d'opérations</span>
            </div>
            <div class="flex items-center space-x-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium">
              <span class="flex items-center justify-center bg-orange-500 text-white w-5 h-5 rounded-full text-xs">02</span>
              <span>Informations</span>
            </div>
          </nav>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 class="text-xl font-semibold mb-6">Informations sur la marchandise</h2>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Pays de destination
              </label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option value="">Sélectionnez un pays</option>
                <option value="CM">Cameroun</option>
                <option value="FR">France</option>
                <option value="US">États-Unis</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Description des marchandises
              </label>
              <textarea 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows="4"
                placeholder="Décrivez les marchandises..."
              ></textarea>
            </div>
          </div>

          <div class="mt-8 flex justify-end space-x-4">
            <button class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Retour
            </button>
            <button class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
              Continuer
            </button>
          </div>
        </div>
      </div>
    `
  }
};

const baseStyles = `
  :root {
    --primary: #f97316;
    --primary-hover: #ea580c;
  }
  
  body { 
    font-family: 'Poppins', system-ui, sans-serif;
    margin: 0;
    padding: 20px;
    background: transparent;
    color: #1a1a1a;
    -webkit-font-smoothing: antialiased;
  }
  
  .group:hover {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
  
  button {
    font-family: inherit;
    cursor: pointer;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  select, textarea {
    font-family: inherit;
    font-size: 0.875rem;
  }

  select:focus, textarea:focus {
    outline: none;
  }
`;

export const getMockSimpaContent = async (path: string): Promise<SimpaResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const page = mockPages[path as keyof typeof mockPages];
  
  if (!page) {
    throw new Error(`Page not found: ${path}`);
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${page.title}</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        ${page.content}
      </body>
    </html>
  `;

  return {
    html,
    status: 200,
    headers: {
      'content-type': 'text/html',
      'cache-control': 'no-cache'
    }
  };
};