#pragma once
#include <iostream>
#include <SFML/Graphics.hpp>
#include <SFML/Audio.hpp>
#include <sstream>
#include "Player.h"
#include "RenderManager.h"
#include "IFachada.h"
#include "tinystr.h"
#include "tinyxml.h"
#define WIDTH 12
#define HEIGHT 8

//SINGLETON

using namespace std;

class Tablero{
    private:
        //Crear clase Casilla que contenga los atributos del struct
        struct boardInfo {
            Invocacion* unit=new Invocacion();
            bool free;        // Ocupado o no por obstaculo
            int coordX;       // Coordenada X
            int coordY;       // Coordenada Y
            bool spawn1;      // spawn permitted commander1
            bool spawn2;      // spawn permitted commander2
            int alcanzable=0; // Nùmero casillas adyacentes accesibles
            int id;           //0 azul, 1 verde, 2 rojo
        };
        
        //Variables de tablero
        boardInfo board[WIDTH][HEIGHT]; //board matrix with information about what it contains
        int offsetX; //Espacio por la izquierda
        int offsetY; //Espacio por arriba
        int sizeX;   //Tamaño de la casilla en X
        int sizeY;   //Tamaño de la casilla en Y
        
        //Motor
        IFachada* motor = RenderManager::Instance(1)->getMotor();
        
        //Tilemap
        int _width;
        int _tilewidth;
        
        int ***_tilemap;
        int _numlayers;
        int _height;
        int _tileheigth;
    
        sf::Sprite ****_tilemapSprite;
        sf::Sprite *_tilesetSprite;
    
        sf::Texture _tilesetTexture;
        
        //Jugadores
        Player* player1;
        Player* player2;
        
        //orden del turno
        bool turno=true;
        
        //Variables de sprites
        float spriteSize; //Resolución de los sprites
        
        //id's Sprites
        int idverde;
        int idrojo;
        int idazul;
        int idvidacu;
        int idvidaco;
        int fuente;
        int fuentemana;
        int manarest;
        int barra;
        int mana;
        int retrato1;
        int retrato2;
        int idle;
        int fondo;
        int click=0;
      
       sf::Texture texturacarta;
       
       //Variables principales
       static Tablero* pinstance; //Puntero del objeto
       sf::RenderWindow* window;  //Ventana del juego
       
    protected:
        ///////////////////////////////
        // CONSTRUCTO / DESTRUCTOR
        ///////////////////////////////
        Tablero();
        Tablero(const Tablero&);
        
    public:
        static Tablero* Instance();
        ~Tablero();
        void clear();
        void cargarMapa();
        bool addUnit(int posx, int posy, Invocacion* unit, int spawn); //return true if adds a unit at the location succesfully
        bool addUnitIA();
        bool moveToPos(int fromx, int fromy,int gox, int goy, Invocacion* unit); //returns true if unit is moved succesfully
        bool moveToPosIA();
        int atackToPos(int fromx, int fromy,int gox, int goy);
        int atackToPosIA(Invocacion* ia, Invocacion* humano);
        bool removeUnit(int posx, int posy, Invocacion* unit); //returns true if unit is removed succesfully
        void Adyacentes(int posx, int posy);
        int getAlcanzable(int posx, int posy);
        Invocacion* esCarta(int posx, int posy);
        void resetMap();
        bool isFree(int posx, int posy);
        int getClick(){return click;}
        void setClick(int i){click=1;}
        
        ///////////////////////////////
        // DIBUJADO
        ///////////////////////////////
        void drawMap();
        void drawAdyacentes();
        void drawUnit();
        void drawInvocaciones(vector<Invocacion*> array);
        void ReiniciarAdy();
        void drawLife(int commander);
        void drawLifeNumb(int commander);
        void drawManaRest(int commander);
        void drawManaNumb(int commander);
        void drawBarra(int commander);
        void drawMana(int commander);
        void drawRetrato(int commander);
        void Mostrar_mano(int id);
        
        ///////////////////////////////
        // GETTERS Y SETTERS
        ///////////////////////////////
        void setWindow(sf::RenderWindow* w) { window = w;    };
        void setTurno(bool metoca)          { turno=metoca;  };
        Player* getPlayer()                 { return player1;};
        Player* getPlayer2()                { return player2;};
        void setFree(int posx,int posy,bool set);
};