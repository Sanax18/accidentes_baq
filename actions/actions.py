from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

# class ActionAgradecimientoPersonalizado(Action):
#     def name(self) -> str:
#         return "action_agradecimiento_personalizado"

#     def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
#         # Llama a la respuesta predeterminada
#         dispatcher.utter_message(response="utter_agradecimiento")
        
#         # Agrega cualquier lógica adicional aquí, si es necesario
#         # Por ejemplo, puedes registrar un agradecimiento en la base de datos o enviar un mensaje a un admin
        
#         return []
