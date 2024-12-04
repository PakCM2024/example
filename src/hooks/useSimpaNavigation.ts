import { useState, useEffect } from 'react';
import { fetchSimpaContent } from '../utils/proxy';

interface SimpaContent {
  html: string;
  currentPath: string;
  formData: Record<string, any>;
}

export const useSimpaNavigation = () => {
  const [content, setContent] = useState<SimpaContent>({
    html: '',
    currentPath: '/init-simulation',
    formData: {}
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const html = await fetchSimpaContent(content.currentPath);
        setContent(prev => ({
          ...prev,
          html
        }));
      } catch (error) {
        console.error('Failed to load SIMPA content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [content.currentPath]);

  const navigate = (path: string) => {
    setContent(prev => ({
      ...prev,
      currentPath: path
    }));
  };

  const handleFormSubmit = async (formElement: HTMLFormElement) => {
    try {
      setIsLoading(true);
      const formData = new FormData(formElement);
      const data = Object.fromEntries(formData.entries());
      
      // Update form data in state
      setContent(prev => ({
        ...prev,
        formData: { ...prev.formData, ...data }
      }));

      // Navigate to next step
      const nextPath = formElement.getAttribute('data-next-step') || '/next-step';
      navigate(nextPath);
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  const handleOperationSelect = (operationType: string) => {
    setContent(prev => ({
      ...prev,
      formData: { ...prev.formData, operationType },
      currentPath: `/operation/${operationType}`
    }));
  };

  return { 
    content,
    isLoading,
    navigate,
    handleFormSubmit,
    handleOperationSelect
  };
};