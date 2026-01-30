// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INICIALIZAÇÃO =====
    inicializarPortfolio();
    
    // ===== FUNÇÕES PRINCIPAIS =====
    
    /**
     * Inicializa todas as funcionalidades do portfólio
     */
    function inicializarPortfolio() {
        atualizarAnoAtual();
        configurarMenuMobile();
        configurarRolagemSuave();
        configurarCopiarEmail();
        configurarAnimacoesRolagem();
    }
    
    /**
     * Atualiza o ano atual no rodapé
     */
    function atualizarAnoAtual() {
        const elementoAno = document.getElementById('anoAtual');
        if (elementoAno) {
            elementoAno.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Configura o menu móvel
     */
    function configurarMenuMobile() {
        const botaoMenu = document.querySelector('.botao-menu');
        const linksNavegacao = document.querySelector('.links-navegacao');
        
        if (botaoMenu && linksNavegacao) {
            botaoMenu.addEventListener('click', function() {
                linksNavegacao.classList.toggle('ativo');
                
                // Alterna ícone do menu
                const icone = this.querySelector('i');
                if (icone.classList.contains('fa-bars')) {
                    icone.classList.replace('fa-bars', 'fa-times');
                } else {
                    icone.classList.replace('fa-times', 'fa-bars');
                }
            });
            
            // Fecha menu ao clicar em um link
            document.querySelectorAll('.links-navegacao a').forEach(link => {
                link.addEventListener('click', () => {
                    linksNavegacao.classList.remove('ativo');
                    const icone = botaoMenu.querySelector('i');
                    icone.classList.replace('fa-times', 'fa-bars');
                });
            });
        }
    }
    
    /**
     * Configura rolagem suave para links internos
     */
    function configurarRolagemSuave() {
        document.querySelectorAll('a[href^="#"]').forEach(ancora => {
            ancora.addEventListener('click', function(e) {
                e.preventDefault();
                
                const idAlvo = this.getAttribute('href');
                if (idAlvo === '#') return;
                
                const elementoAlvo = document.querySelector(idAlvo);
                if (elementoAlvo) {
                    const alturaCabecalho = document.querySelector('.navegacao').offsetHeight;
                    const posicaoAlvo = elementoAlvo.offsetTop - alturaCabecalho;
                    
                    window.scrollTo({
                        top: posicaoAlvo,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /**
     * Configura funcionalidade de copiar e-mail
     */
    function configurarCopiarEmail() {
        const botaoCopiar = document.getElementById('botaoCopiarEmail');
        const enderecoEmail = 'arthurvalverde.conde@gmail.com';
        const notificacao = document.getElementById('notificacaoCopiar');
        
        if (botaoCopiar && notificacao) {
            botaoCopiar.addEventListener('click', function() {
                // Usa a API Clipboard para copiar o texto
                navigator.clipboard.writeText(enderecoEmail)
                    .then(() => {
                        // Mostra notificação
                        notificacao.classList.add('mostrar');
                        
                        // Esconde notificação após 3 segundos
                        setTimeout(() => {
                            notificacao.classList.remove('mostrar');
                        }, 3000);
                    })
                    .catch(erro => {
                        console.error('Erro ao copiar e-mail:', erro);
                        alert('Não foi possível copiar o e-mail. Por favor, copie manualmente: ' + enderecoEmail);
                    });
            });
        }
    }
    
    /**
     * Configura animações na rolagem
     */
    function configurarAnimacoesRolagem() {
        // Adiciona classe à navegação quando rolar a página
        const navegacao = document.querySelector('.navegacao');
        
        if (navegacao) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navegacao.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    navegacao.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                } else {
                    navegacao.style.boxShadow = 'none';
                    navegacao.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                }
            });
        }
        
        // Adiciona efeito de aparecimento gradual às seções
        const opcoesObservador = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observador = new IntersectionObserver(function(entradas) {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.style.opacity = '1';
                    entrada.target.style.transform = 'translateY(0)';
                }
            });
        }, opcoesObservador);
        
        // Aplica observador às seções principais
        document.querySelectorAll('.secao').forEach(secao => {
            secao.style.opacity = '0';
            secao.style.transform = 'translateY(20px)';
            secao.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observador.observe(secao);
        });
    }
    
    /**
     * Função auxiliar para validar e-mail
     */
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
});