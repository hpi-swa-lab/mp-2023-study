from dataclasses import dataclass
import dataclasses
from enum import Enum
from typing import List
import json
import random


class Platform(str, Enum):
    PC = "PC"
    VR = "VR"


class SurveyId(str, Enum):
    DEMOGRAPHICS = "demographics"
    TLX = "tlx"
    DONE = "done"


class Condition(str, Enum):
    DesktopNoDecomp = "Desktop-NoDecomp"
    DesktopDecomp = "Desktop-Decomp"
    VRNoDecomp = "VR-NoDecomp"
    VRDecomp = "VR-Decomp"


@dataclass(eq=True, frozen=True)
class Statement:
    text: str
    correct: bool


@dataclass()
class State:
    platform: Platform
    surveyId: SurveyId | Condition
    stateId: int
    toProof: str
    statements: List[Statement]
    arrangeable: bool

    def as_dict(self):
        return dataclasses.asdict(self)

    def as_json(self):
        return json.dumps(dataclasses.asdict(self), indent=4, ensure_ascii=False)


test_state = State(
    platform=Platform.PC,
    surveyId=SurveyId.DEMOGRAPHICS,
    stateId=2,
    toProof="Beweise: Alle Weintrinker sind rothaarig",
    statements=[
        Statement(text="alle Weintrinker sind 20 Jahre alt", correct=False),
        Statement(text="alle Weintrinker sind irisch", correct=True),
        Statement(text="alle Weintrinker wohnen in potsdam", correct=True),
        Statement(text="alle potsdamer sind klein", correct=True),
        Statement(text="alle iren haben große füße", correct=True),
        Statement(
            text="alle potsdamer, die große füße haben, sind abenteuerlustig", correct=True),
        Statement(
            text="alle potsdamer, die große füße haben und drei füße haben, sind irisch", correct=False),
        Statement(text="alle iren sind reich", correct=False),
        Statement(
            text="alle abenteuerlustigen, die medizin studieren, sind rothaarig", correct=False),
        Statement(text="alle münsteraner studieren medizin", correct=False),
        Statement(text="alle briten sind münsteraner", correct=False),
        Statement(
            text="alle abenteuerlustigen, die klein sind, sind rothaarig", correct=True),
    ],
    arrangeable=True
)


def get_statements(adj1: str, adj2: str, adj3: str, adj4: str, adj5: str, sub1: str, sub2: str, sub3: str, sub4: str, cit1: str, cit2: str, nat1: str, nat2: str):
    """returns a (toProof, statements list) tuple for the given adjectives, subjects, cities and nationalities. toProof is always true and has the form 'Beweise: Alle <sub3> sind <adj1>' """
    statements = [
        Statement(f"alle {adj2}en, die {adj3} sind, sind {adj1}", True),
        Statement(f"alle {cit1}er sind {adj2}", True),
        Statement(f"alle {sub3} sind {cit1}er", True),
        Statement(f"alle {cit1}er, die {sub2} haben, sind {adj3}", True),
        Statement(f"alle {sub3} sind {nat1}", True),
        Statement(f"alle {nat1} haben {sub2}", True),
        Statement(f"alle {sub3} sind {adj5}", False),
        Statement(f"alle {nat1} sind {adj4}", False),
        Statement(
            f"alle {cit1}er, die {sub2} und {sub4} haben, sind {nat1}", False),
        Statement(f"alle {adj3}en, die {sub1} haben, sind {adj1}", False),
        Statement(f"alle {cit2}er haben {sub1}", False),
        Statement(f"alle {nat2} sind {cit2}er", False),
    ]
    random.shuffle(statements)

    if len(set(statements)) != len(statements):
        raise ValueError("duplicate statements")

    return (f"Beweise: Alle {sub3} sind {adj1}", statements)


statementsMatrix = [
    # 12 zufällige adjektive
    ['schillernd', 'fesselnd', 'zauberhaft', 'wunderbar', 'bemerkenswert', 'flauschig',
        'glitzernd', 'herrlich', 'strahlend', 'atemberaubend', 'furchtlos', 'zauberhaft'],
    ['spritzig', 'knallig', 'verrückt', 'zaubernd', 'herzerwärmend', 'schelmisch',
        'glänzend', 'zauberhaft', 'leuchtend', 'strahlend', 'atemlos', 'phantastisch'],
    ['knallig', 'fröhlich', 'verrückt', 'malerisch', 'herzergreifend', 'glamourös',
        'abenteuerlich', 'leuchtend', 'quirlig', 'zauberhaft', 'fesselnd', 'fantastisch'],
    ['fröhlich', 'verwegen', 'glamourös', 'gemütlich', 'phantastisch', 'munter',
        'zaubernd', 'strahlend', 'glänzend', 'herzlich', 'mutig', 'funkelnd'],
    [f"{i}" for i in range(20, 33)],
    # 4 zufällige Substantive
    ['Blume', 'Kaffee', 'Sonne', 'Berg', 'Schmetterling', 'Ozean',
        'Wald', 'Regenbogen', 'Stern', 'Einhorn', 'Buch', 'Drache'],
    ['Katzen', 'Hunde', 'Blumen', 'Bücher', 'Sterne', 'Wolken',
        'Schlüssel', 'Tische', 'Berge', 'Häuser', 'Stühle', 'Bäume'],
    ['Max', 'Sophie', 'Lukas', 'Emily', 'Paul', 'Lena',
        'Jonas', 'Anna', 'Finn', 'Emma', 'Tim', 'Hannah'],
    ['Augen', 'Haare', 'Ohren', 'Arme', 'Beine', 'Hände',
        'Finger', 'Zehen', 'Nasen', 'Lippen', 'Schultern', 'Knie'],
    # 2 zufällige Städte
    ['Berlin', 'New York', 'Tokio', 'London', 'Paris', 'Rom', 'Sydney',
        'Istanbul', 'Rio de Janeiro', 'Moskau', 'Kapstadt', 'Toronto'],
    ['Shanghai', 'Los Angeles', 'Dubai', 'Mumbai', 'Barcelona', 'Amsterdam',
        'Seoul', 'Singapur', 'Kairo', 'Bangkok', 'Stockholm', 'Lissabon'],
    # 2 zufällige Nationalitäten
    ['Iren', 'Deutsche', 'Franzosen', 'Italiener', 'Schweden', 'Mexikaner',
     'Amerikaner', 'Kanadier', 'Australier', 'Spanier', 'Brasilianer', 'Griechen'],
    ['Briten', 'Schweizer', 'Österreicher', 'Chinesen', 'Japaner', 'Inder',
     'Südafrikaner', 'Ägypter', 'Thailänder', 'Griechen', 'Kolumbianer', 'Türken']
]


def flatten(container):
    """source: https://stackoverflow.com/questions/10823877/what-is-the-fastest-way-to-flatten-arbitrarily-nested-lists-in-python
    Why does it need to be so complicated, Python?"""
    for i in container:
        if isinstance(i, (list, tuple)):
            for j in flatten(i):
                yield j
        else:
            yield i
